const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/Root/image/upload/v1743187501/airbnb/1743187498164.jpg",
    },
}, { timestamps: true });


//encrypt password
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

//create and return jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
};  

//validate the password
userSchema.methods.isvalidatedPassword = async function (userSchema) {    
    return await bcrypt.compare(userSentPassword, this.password);  
};      

const User = mongoose.model("User", userSchema);
module.exports = User;