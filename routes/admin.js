const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.send("admin controls")
})


module.exports = router