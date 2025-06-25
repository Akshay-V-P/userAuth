
const adminModel = require('../model/adminModel')
const userModel = require('../model/userModel')
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

const loadDashboard = async (req, res) => {
    const users = await userModel.find({})
    res.render('admin/dashboard')
}

const logout = (req, res) => {
    req.session.admin = null
    res.redirect('/admin/login')
}

const searchUser = async (req, res) => {
    const email = req.query.email
    let users
    if (email.toLowerCase() == "all") {
        users = await userModel.find({})
    } else {
        const user = await userModel.findOne({ email: email })
        users = user ? [user] : []
    }
    if (users.length == 0) return res.render('admin/dashboard', { message: "User not Found" })
    res.render('admin/dashboard', {users:users})
}

const searchPost = (req, res) => {
    const { email } = req.body
    res.redirect(`/admin/search?email=${encodeURIComponent(email)}`);
}

const editUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.findOneAndUpdate({ email: email }, { password: hashedPassword })
        if (!user) return res.render('admin/dashboared', { message: "Cant update user" })
        res.redirect('/admin/dashboard')
    } catch (err) {
        console.log(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        const _id = req.params._id
        const user = await userModel.findOneAndDelete({ _id: _id })
        console.log(req.session.user)
        req.session.user = null
        res.redirect("/admin/dashboard")
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    loadLogin,
    login,
    loadDashboard,
    logout,
    searchUser,
    searchPost,
    editUser,
    deleteUser
}