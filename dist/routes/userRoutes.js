"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const userValidation_1 = require("../validation/userValidation/userValidation");
const router = (0, express_1.Router)();
router.post("/signup", userValidation_1.signupUserValidation, userControllers_1.signupUser);
router.post("/signin", userValidation_1.signinUserValidation, userControllers_1.signinUser);
router.post("/send-verification-mail", userValidation_1.sendVerificationMailValidation, userControllers_1.sendVerificationMail);
router.post("/verify-user-mail", userValidation_1.verifyUserMailValidation, userControllers_1.verifyUserMail);
router.post("/forgot-password", userValidation_1.sendForgotPasswordMailValidation, userControllers_1.sendForgotPasswordMail);
router.post("/verify-forgot-mail", userValidation_1.verifyForgotMailValidation, userControllers_1.verifyForgotMail);
exports.default = router;