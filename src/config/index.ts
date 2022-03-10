import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Sequelize } from "sequelize";

const db = new Sequelize("authDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
  // operatorsAliases: false,
  logging: false,
});

export default db;

dotenv.config();

export const DB = process.env.DB!;
export const PORT = parseInt(process.env.PORT!);
export const JWT_KEY = process.env.JWT_KEY!;
export const FRONTEND_URL = process.env.FRONTEND_URL!;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();
let testAccount = {
  user: "ayajnwfyghendnff@ethereal.email",
  pass: "mCT5eXxfJ7UHy5fvcf",
};

// create reusable transporter object using the default SMTP transport
export let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass, // generated ethereal password
  },
});
