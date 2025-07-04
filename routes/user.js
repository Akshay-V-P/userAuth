const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const auth = require('../middleware/auth')

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

router.get('/login',auth.isLogin, userController.loadLogin)

router.get('/register', auth.isLogin, userController.loadRegister)

router.get('/home',auth.checkSession, userController.userHome)

router.get('/logout', userController.logout)

router.post('/register', auth.isLogin, userController.registerUser)

router.post('/login',auth.isLogin, userController.loginUser)


module.exports = router