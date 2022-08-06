const mongoose = require("mongoose");
const setPassword = require("../auth/authHandler");






const UserSchema = new mongoose.Schema({
    email:{
        type: String, 
        required: true
    },
    password:{
        type: String,
        required: true,
        set: setPassword
    }
});

const model = mongoose.model("User", UserSchema);
module.exports = model;