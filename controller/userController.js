const { default: mongoose } = require('mongoose')
const userSchema = require('../model/userModel')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
    try {
        const { email, password, username } = req.body
        const user = await userSchema.findOne({email:email})
        if (user) {
            return res.render('user/login', { message: "User already exists"})
        }
        const findUsername = await userSchema.findOne({ username: username })
        
        if (findUsername) return res.render('user/register', { message: "Username already exists" })
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userSchema({
            email,
            password: hashedPassword,
            username
        })
        await newUser.save()
        res.render('user/login', {message: "User created succesfully"})
    } catch (error) {
        console.log(error)
        res.send("Couldn't create a user now........ Please try again")
    }
}

const loadLogin = (req, res) => {
    res.render('user/login')
}

const loadRegister = (req, res) => {
    res.render('user/register')
}

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const userExists = await userSchema.findOne({ email: email })
        if (!userExists) {
            return res.render('user/register', {message: "User not found"})
        }

        const passwordMatch = await bcrypt.compare(password, userExists.password)
        
        if (!passwordMatch) {
            return res.render('user/login', {message: "Incorrect password"})
        }
        req.session.user = true;
        res.redirect('/user/home/')
    } catch (error) {
        console.log(error)
    }
}

const userHome = (req, res) => {

    res.render('user/userHome')
}

const logout = (req, res) => {
    req.session.user = null;
    res.redirect('/user/login');
}


module.exports = {loadLogin, loadRegister, registerUser, loginUser, userHome, logout};