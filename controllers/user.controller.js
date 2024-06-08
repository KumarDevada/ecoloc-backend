import { body, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import { generateAccessToken } from "../middlewares/auth.js";

export const createUser = [
    body('username').trim().notEmpty().escape().withMessage("username cannot be empty").custom( async (value) => {
        const user = await User.findOne({ username: value }).exec();
        if(user) throw new Error('Already user exists with the username!! Try another username');
    }),
    body('email').trim().isEmail().withMessage("Not a valid email").custom( async (value) => {
        const user = await User.findOne({ email: value }).exec();
        if(user) {
            throw new Error('Already user exists with email');
        }
    }).withMessage("Already user exists with this email"),
    body('password').trim().isLength({ min: 8 }).withMessage("invalid password!! password length should be minimum 8"),

    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const response = {
                success: false,
                message: errors.array()[0].msg
            };

            return res.status(400).json(response);
        }

        try {
            const uname = req.body.username;
            const pwd = req.body.password;
            const email = req.body.email;

            const hashedPwd = await bcrypt.hash(pwd, 10);
            const user = new User({ username: uname, password: hashedPwd, email: email });
            await user.save();

            const response = {
                success: true,
                data: {
                    username: user.username,
                    userId: user._id,
                    email: user.email,
                },
            };

            return res.status(200).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
];

export const userLogin = [
    body('username').trim().notEmpty().withMessage("invalid username!! username is required to login").escape(),
    body('password').trim().isLength({ min: 8 }).withMessage("invalid password!!").escape(),

    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const response = {
                success: false,
                message: errors.array()[0].msg
            };
            return res.status(400).json(response);
        }

        try {
            const user = await User.findOne({ username: req.body.username }).exec();
        
            if(!user) {
                return res.status(401).json({ success: false, message: "Invalid username!! no user exists with the username" });
            }

            const pwd = req.body.password;
            const storedPwd = user.password;
            const match = await bcrypt.compare(pwd, storedPwd);
            
            if(!match) {
                return res.status(401).json({ success: false, message: "invalid password" });
            }

            const { username, email, _id, credits, treesPlanted } = user;
            const userPlayload = { username, email, userId: _id, credits, treesPlanted };

            const accessToken = generateAccessToken(userPlayload);

            const response = {
                success: true,
                user: {
                    ...userPlayload,
                    accessToken: accessToken
                }
            };

            return res.status(200).json(response);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
];

export const redeemCredits = async (req, res) => {
    try {
        const redeem = req.body.redeem;
        const userId = req.user.userInfo.userId;
        const user = await User.findById(userId);
        user.credits = user.credits - redeem;
        await user.save();

        res.status(200).json({ success: true, message: 'credits redeemed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}