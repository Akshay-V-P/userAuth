const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/register', (req, res) => {
    res.render('user/register')
})

router.post('/register', (req, res) => {
    console.log(req.body)
    res.send("success")
})

module.exports = router