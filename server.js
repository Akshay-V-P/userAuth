const express = require('express')
const app = express()
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const path = require('path')
const connectDb = require('./db/connectDB')
const nocache = require('nocache')
const session = require('express-session')



app.use(nocache())
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

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