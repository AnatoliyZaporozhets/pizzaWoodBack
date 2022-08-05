const formidable = require("formidable");
const ProductModel = require("../models/product");
const fs = require("fs");

const sendJSONResponse = (res, status, content) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(status).json(content);
};

module.exports.getList = function (req, res) {
  const searchObj = {typeProd : req.params.prodName } || {};
  if (searchObj === 'undefined') {
    searchObj = {}
  }
  console.log(searchObj);
  ProductModel.find(searchObj, function (err, product) {
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
  let product;
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    product = new ProductModel({
      title: fields.title,
      typeProd: fields.typeProd,
      minPrice: parseFloat(fields.minPrice),
      maxPrice: parseFloat(fields.maxPrice),
      photo: {
        data: fs.readFileSync(files.photo.filepath),
        contentType: files.photo.mimetype,
      },
      ingredients: fields.ingredients,
    });
  });
  form.on("end", function (d) {
    num++;
    if (num == 1) {
      product.save(function (err, productObj) {
        if (err) {
          sendJSONResponse(res, 500, {
            success: false,
            err: { msg: "Saving faild!" },
          });
          return;
        }
        sendJSONResponse(res, 201, { success: true, data: productObj });
      });
    }
  });
};

module.exports.delete = function (req, res) {
  ProductModel.findByIdAndDelete(req.body.id, function (err) {
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
  let product;
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    product = {
      title: fields.title,
      price: parseFloat(fields.price),
    };
    req.body.id = fields._id;
    req.body.product = product;
    if (files.photo.originalFilename) {
      product.photo = {
        data: fs.readFileSync(files.photo.filepath),
        contentType: files.photo.mimetype,
      };
    }
  });
  form.on("end", function (d) {
    num++;
    if (num == 1) {
      ProductModel.findByIdAndUpdate(
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
  ProductModel.findById(req.params.id, function (err, searchProd) {
    console.log(req.params.id);
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
