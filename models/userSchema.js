const mongoose = require('mongoose');
async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI);
  }
let userSchema = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    mobileNumber:Number,
    tasks:[]
});

const User = mongoose.model("User",userSchema);

module.exports =User;