const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/:id', userController.getOne)
router.put('/:id', userController.updateOne)
router.delete('/:id', userController.delete)

module.exports = router