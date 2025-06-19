const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

router.get('/login',auth.isLogin, userController.loadLogin)

router.get('/register', auth.isLogin, userController.loadRegister)

router.get('/home', userController.userHome)

router.get('/logout', userController.logout)

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)


module.exports = router