const express = require('express')
const app = express()
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const path = require('path')
const connectDb = require('./db/connectDB')

// view engine setup
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'view'))
app.use(express.static('public'))

// user route
app.use('/user', userRoutes)
// admin route
app.use('/admin', adminRoutes)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDb()
app.listen(3000, () => {
    console.log("Server Listening....")
})