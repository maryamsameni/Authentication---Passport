const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique : true },
    password: { type: String, required: true }
})
const userSchema = mongoose.model('user', schema)
module.exports = userSchema