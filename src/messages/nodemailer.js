import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: PROCESS.env.MAILER_USER,
        pass: PROCESS.env.MAILER_PASS
}});

export default transporter;