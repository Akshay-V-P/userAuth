const adminModel = require('../model/adminModel')
const bcrypt = require('bcrypt')

const loadLogin = (req, res) => {
    res.render('admin/login');
} 

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email && !password) {
            console.log("No values ", email, password)
            return
        }
        
        const admin = await adminModel.findOne({ email: email })

        if (!admin) return res.render('admin/login', { message: "Invalid credentials" })
        
        const matchPassword = await bcrypt.compare(password, admin.password)

        if (!matchPassword) return res.render('admin/login', { message: "Invalid credentials" })
        
        req.session.admin = true;
        res.redirect('/admin/dashboard')

    } catch (err) {
        console.log(err)
    }

}

const loadDashboard = (req, res) => {
    res.render('admin/dashboard')
}

const logout = (req, res) => {
    req.session.admin = null
    res.redirect('/admin/login')
}


module.exports = {
    loadLogin,
    login,
    loadDashboard,
    logout
}