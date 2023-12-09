import cron from "node-cron";
import { LoanService } from "../services/loan.service.js";
import { transporter } from "../messages/nodemailer.js";
import { messages } from "../messages/messages.js";

const cronTask = cron.schedule("0 0 0 * * *", () => {
  let today = Date.now();
  today = today.toISOString().slice(0, 10);
  const dueLoans = LoanService.getByDueDate(today);
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

export default cronTask;
