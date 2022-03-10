"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyForgotMail = exports.sendForgotPasswordMail = exports.verifyUserMail = exports.sendVerificationMail = exports.signinUser = exports.signupUser = void 0;
const http_errors_1 = __importStar(require("http-errors"));
const UserSchema = require("../model/User").UserSchema;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const signupUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await UserSchema.findOne({ where: { email } });
        if (existingUser)
            return next((0, http_errors_1.default)(422, "Email already exists"));
        const hashedPassword = await bcrypt_1.default.hash(password, 8);
        const user = await UserSchema.create({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ status: 200, message: `User ${name} Created` });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.signupUser = signupUser;
const signinUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ where: { email } });
        if (!user)
            return next((0, http_errors_1.default)(404, "User not found!"));
        console.log(user.isUserVerified);
        if (!user.isUserVerified)
            return next((0, http_errors_1.default)(406, "User not verified!"));
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword)
            return next((0, http_errors_1.default)(401, "Not a valid password!"));
        const token = jsonwebtoken_1.default.sign({
            name: user.name,
            email: user.email,
            userId: user.id
        }, config_1.JWT_KEY, {
            expiresIn: "7d",
        });
        res.cookie("jwt", token);
        res.status(200).json({ name: user.name, token });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.signinUser = signinUser;
const sendVerificationMail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await UserSchema.findOne({ where: { email } });
        console.log(user);
        if (!user)
            return next((0, http_errors_1.default)(404, "Email not valid!"));
        if (user.isUserVerified)
            return next((0, http_errors_1.default)(406, "User already verified"));
        const encryptedToken = await bcrypt_1.default.hash(user.id.toString(), 8);
        const jwtToken = await jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_KEY, {
            expiresIn: "60m"
        });
        // send mail with defined transport object
        let info = await config_1.transporter.sendMail({
            from: '"Fred Foo 👻" <jb@example.com>',
            to: `${email}`,
            subject: "For Email Verification",
            html: `Your Verification Link <a href="${config_1.FRONTEND_URL}/email-verify/${jwtToken}">Link</a>`, // html body
        });
        await user.update({ verifyToken: encryptedToken });
        res.status(200).json({ message: `Preview URL: %s, ${nodemailer_1.default.getTestMessageUrl(info)}` });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.sendVerificationMail = sendVerificationMail;
const verifyUserMail = async (req, res, next) => {
    const { token } = req.body;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_KEY);
        const user = await UserSchema.findByPk(decodedToken.userId);
        if (!user)
            return next((0, http_errors_1.default)(401, "Token Invalid"));
        await user.update({ isUserVerified: true }, { verifyToken: 0 });
        res.status(200).json({ message: "Email verified" });
    }
    catch (error) {
        return next((0, http_errors_1.default)(401, "Token Invalid"));
    }
};
exports.verifyUserMail = verifyUserMail;
const sendForgotPasswordMail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await UserSchema.findOne({ where: { email } });
        if (!user)
            return next((0, http_errors_1.default)(404, "Email not valid!"));
        const encryptedToken = await bcrypt_1.default.hash(user.id.toString(), 8);
        const jwtToken = await jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_KEY, {
            expiresIn: "60m"
        });
        // send mail with defined transport object
        let info = await config_1.transporter.sendMail({
            from: '"Fred Foo 👻" <jb@example.com>',
            to: `${email}`,
            subject: "For Forgot Password Verification Mail",
            // text: "Hello world?", // plain text body
            html: `Your Verification for Forgot Password Link <a href="${config_1.FRONTEND_URL}/forgot-password-verify/${jwtToken}">Link</a>`, // html body
        });
        await user.update({ verifyToken: encryptedToken });
        res.status(200).json({ message: `Preview URL: %s, ${nodemailer_1.default.getTestMessageUrl(info)}` });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.sendForgotPasswordMail = sendForgotPasswordMail;
const verifyForgotMail = async (req, res, next) => {
    const { token, password } = req.body;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_KEY);
        const user = await UserSchema.findByPk(decodedToken.userId);
        if (!user)
            return next((0, http_errors_1.default)(401, "Token Invalid"));
        const encryptedPassword = await bcrypt_1.default.hash(password, 8);
        await user.update({ password: encryptedPassword }, { verifyToken: 0 });
        res.status(201).json({ message: "Password Changed!" });
    }
    catch (error) {
        return next((0, http_errors_1.default)(401, "Token Invalid"));
    }
};
exports.verifyForgotMail = verifyForgotMail;
