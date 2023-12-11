import cron from "node-cron";
import { LoanService } from "../services/loan.service.js";
import { transporter } from "../messages/nodemailer.js";
import { messages } from "../messages/messages.js";

const dailyDues = () => {
  cron.schedule("0 0 0 * * *", async () => {
    let today = new Date();
    const dueLoans = await LoanService.getByDueDate(today);
    console.log(dueLoans);
    dueLoans.forEach((loan) => {
      const mailOptions = messages.dueLoansMessage(loan);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  });
};

const oldDues = () => {
  cron.schedule("0 0 0 * * *", async () => {
    let today = new Date();
    const dueLoans = await LoanService.getOldDueLoans(today);
    console.log(dueLoans);
    dueLoans.forEach((loan) => {
      const mailOptions = messages.oldLoansMessage(loan);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  });
};

const CronTask = {
  dailyDues,
  oldDues,
};

export { CronTask };