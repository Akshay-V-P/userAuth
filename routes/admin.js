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

router.post('/search', adminAuth.checkSession, adminController.searchPost)

router.get('/search',adminAuth.checkSession, adminController.searchUser)

router.post('/edit',adminAuth.checkSession, adminController.editUser)

router.post('/delete/:_id',adminAuth.checkSession, adminController.deleteUser)

router.get('/addUser', adminAuth.checkSession, adminController.loadAddUser)

router.post('/addUser',adminAuth.checkSession, adminController.addUser)




module.exports = router