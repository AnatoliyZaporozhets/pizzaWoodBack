const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Створення схеми моделі
const moreIngredientScheme = new Schema({
  title: String,
  typeProd:String,
  price: Number,
})
//Створення моделі
const IngredientModel = mongoose.model('Ingredient', moreIngredientScheme)

module.exports = IngredientModel
