import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
}});

export { transporter };