const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
},{
    versionKey:false
});




const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel



// {
//     "name":"Shubham",
//     "email":"123@gmail.com",
//     "password":"123",
// }