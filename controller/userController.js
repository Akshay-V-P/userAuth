const userSchema = require('../model/userModel')

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const newUser = new userSchema({
            email,
            password
        })
        await newUser.save()
        res.render('user/login')
    } catch (error) {
        
    }
}