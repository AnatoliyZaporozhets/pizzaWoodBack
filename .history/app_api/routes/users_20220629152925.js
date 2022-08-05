var express = require('express')
var router = express.Router()

const usersController = require('../controllers/users')

/* GET список книг. */
router.get('/', usersController.getList)

/* GET видалення книги за id. */
router.post('/signup', usersController.signup)

/* POST Створення нової книги. */
router.post('/login', usersController.login)

module.exports = router
