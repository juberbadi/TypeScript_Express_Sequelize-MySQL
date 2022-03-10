import { Router } from "express";
import { signupUser,
         signinUser,
         sendVerificationMail,
         verifyUserMail,
         sendForgotPasswordMail,
         verifyForgotMail } from '../controllers/userControllers';
import { signupUserValidation,
         signinUserValidation,
         sendVerificationMailValidation,
         verifyUserMailValidation,
         sendForgotPasswordMailValidation,
         verifyForgotMailValidation } from '../validation/userValidation/userValidation';

const router = Router();

router.post("/signup", signupUserValidation, signupUser);
router.post("/signin", signinUserValidation, signinUser);
router.post("/send-verification-mail", sendVerificationMailValidation, sendVerificationMail);
router.post("/verify-user-mail", verifyUserMailValidation, verifyUserMail);
router.post("/forgot-password", sendForgotPasswordMailValidation, sendForgotPasswordMail);
router.post("/verify-forgot-mail", verifyForgotMailValidation, verifyForgotMail);

export default router;
