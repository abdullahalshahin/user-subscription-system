const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const config_app = require('../../../config/app');

const UserModel = require('../../Models/User');
const UserResource = require('../Resources/UserResource');

const login = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().max(150).required(),
            password: joi.string().min(6).max(50).required(),
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data!',
                errors: error.details.map(err => err.message)
            });
        }

        const { email, password } = value;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (user.lockUntil && user.lockUntil > Date.now()) {
            const remainingTime = Math.ceil((user.lockUntil - Date.now()) / 60000);
            return res.status(403).json({
                success: false,
                message: `Account locked. Try again in ${remainingTime} minutes`
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            await user.incrementLoginAttempts();
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        await user.resetLoginAttempts();

        const token = jwt.sign({ email: user.email, id: user._id }, config_app.app_key);

        return res.status(200).json({
            success: true,
            message: "Login Successfully!",
            result: {
                user: await UserResource.Response(req, user),
                token: token,
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const registration = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(3).max(150).required(),
            email: joi.string().min(3).max(150).required(),
            password: joi.string().min(6).max(50).required(),
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data!!!',
                errors: error.details.map(err => err.message) 
            });
        }

        const { name, email, password } = value;

        const existingUser = await UserModel.findOne({ $or: [{ email }] });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "email already exists!!!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
            security: password,
            isActive: false,
            loginAttempts: 0,
        });

        await newUser.save();

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, config_app.app_key);

        return res.status(200).json({
            success: true,
            message: "Registered Successfully!!!",
            result: {
                user: await UserResource.Response(req, newUser),
                token: token,
            }
        });
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login,
    registration
};
