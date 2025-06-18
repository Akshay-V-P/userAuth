const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/userAuth'
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(mongoUrl, {})
        console.log(`MongoDB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb