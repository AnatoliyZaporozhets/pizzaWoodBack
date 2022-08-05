const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Створення схеми моделі
const productScheme = new Schema({
  title: String,
  typeProd:String,
  minPrice: Number,
  maxPrice: Number,
  photo: {
    data: Buffer,
    contentType: String,
  },
  ingredients: String
})
//Створення моделі
const ProductModel = mongoose.model('Product', productScheme)

module.exports = ProductModel
