const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { cookieToken } = require('../utils/cookieToken');

exports.register = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message: 'All fields are required',
            });
        }
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                message: 'User already exists',
            });
        }
        user = await User.create({
            name,
            email,
            password,
        });
        cookieToken(user, res);
    } catch (error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

//login - singup of the user
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: 'All fields are required',
            });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                message: 'User not found',
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message: 'Invalid password',
            });
        }
        cookieToken(user, res);
    } catch (error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

exports.googleLogin = async (req, res) => {
    try{
        const { email, name} = req.body;
        if(!email || !name){
            return res.status(400).json({
                message: 'All fields are required',
            });
        }
        let user = await User.findOne({ email });
        if(!user){
            user = await User.create({
                email,
                name,
                password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
            });
        }
        cookieToken(user, res);
    } catch (error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

//folder with picture upload
exports.uploadPicture = async (req, res) => {
    const {path} = req.files;
    try{
        let result = await cloudinary.uploader.upload(path, {
            folder: 'airbnb/users',
        });
        res.status(200).json({
            picture: result.secure_url,
        });
    } catch (error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

//upadating the user
exports.updateUserDetails = async (req, res) => {
    try{
        const {name, email, picture, password} = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(500).json({
                message: 'User not found',
            });
        }
        //user can update the name, only password profile pic or any of them 
        user.name = name;
        if(picture && !password){
            user.picture = picture;
        } else if(password && !picture){
            user.password = password
        } else {
            user.picture = picture;
            user.password = password;
        }
        const updateUser = await user.save()
        cookieToken(updateUser, res);
    } catch (error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

//logout
exports.logout = async (req, res) => {
    res.cookie('token', '', {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.status(200).json({
        success: true,
        message: 'Logout successfully',

    });
};