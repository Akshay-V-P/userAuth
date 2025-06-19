const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')
const adminAuth = require('../middleware/adminAuth')

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.get('/login',adminAuth.isLogin, adminController.loadLogin)

router.post('/login', adminController.login)

router.get('/dashboard', adminAuth.checkSession, adminController.loadDashboard)

router.get('/logout', adminController.logout)


module.exports = router