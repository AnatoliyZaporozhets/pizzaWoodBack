var express = require('express')
var router = express.Router()

const ingredientController = require('../controllers/ingredients') // Підключення контролера

/* GET список . */
router.get('/:prodName', ingredientController.getList)

/* GET видалення  за id. */
router.delete('/', ingredientController.delete)

/* POST Створення нової . */
router.post('/', ingredientController.add)

// Оновлення інформації  після редагування
router.put('/', ingredientController.update)

/* Відображення інформації про одну  */
router.get('/:prodName/:id', ingredientController.getById)

module.exports = router
