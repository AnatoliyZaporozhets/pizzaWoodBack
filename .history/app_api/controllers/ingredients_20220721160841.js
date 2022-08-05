const formidable = require("formidable");
const IngredientModel = require("../models/ingredient");
const fs = require("fs");

const sendJSONResponse = (res, status, content) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(status).json(content);
};

module.exports.getList = function (req, res) {
  const searchObj ={typeProd : req.params.prodName } ||
  // {title : req.params.prodName }|| 
  {};
  // console.log(searchObj);
  IngredientModel.find(searchObj, function (err, product) {
    if (err)
      return sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Fetch faild!" },
      });

    sendJSONResponse(res, 200, { success: true, data: product });
  });
};

module.exports.add = function (req, res, next) {
  let num = 0;
  let ingredient;
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    ingredient = new IngredientModel({
      title: fields.title,
      typeProd: fields.typeProd,
      price: parseFloat(fields.price),
    });
  });
  form.on("end", function (d) {
    num++;
    if (num == 1) {
      ingredient.save(function (err, ingredientObj) {
        if (err) {
          sendJSONResponse(res, 500, {
            success: false,
            err: { msg: "Saving faild!" },
          });
          return;
        }
        sendJSONResponse(res, 201, { success: true, data: ingredientObj });
      });
    }
  });
};

module.exports.delete = function (req, res) {
  IngredientModel.findByIdAndDelete(req.body.id, function (err) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Delete faild!" },
      });
      return;
    }
    sendJSONResponse(res, 200, { success: true });
  });
};

module.exports.update = function (req, res, next) {
  let num = 0;
  let ingredient;
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    ingredient = {
      title: fields.title,
      typeProd: fields.typeProd,
      price: parseFloat(fields.price),
    };
    req.body.id = fields._id;
    req.body.ingredient = ingredient;
  });
  form.on("end", function (d) {
    num++;
    if (num == 1) {
      IngredientModel.findByIdAndUpdate(
        req.body.id,
        req.body.product,
        { new: true },
        function (err) {
          // mongoose.disconnect()
          if (err) {
            sendJSONResponse(res, 500, {
              success: false,
              err: { msg: "Update faild!" },
            });
            return;
          }

          sendJSONResponse(res, 200, { success: true });
        }
      );
    }
  });
};

module.exports.getById = function (req, res) {
  IngredientModel.findById(req.params.id, function (err, searchProd) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: "Find book faild!" },
      });
      return;
    }
    sendJSONResponse(res, 200, { success: true, data: searchProd });
  });
};
