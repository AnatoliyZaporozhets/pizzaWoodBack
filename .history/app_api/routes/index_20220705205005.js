var express = require('express')
var router = express.Router()

const prodController = require('../controllers/products') // Підключення контролера

/* GET список . */
router.get('/:prodName', prodController.getList)

/* GET видалення  за id. */
router.delete('/', prodController.delete)

/* POST Створення нової . */
router.post('/', prodController.add)

// Оновлення інформації  після редагування
router.put('/', prodController.update)

/* Відображення інформації про одну  */
router.get('/:id', prodController.getById)

module.exports = router
