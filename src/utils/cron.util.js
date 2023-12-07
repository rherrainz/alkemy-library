import cron from "node-cron";
import { LoanService } from "../services/loan.service.js";
import { transporter } from "../messages/nodemailer.js";

const cronTask = cron.schedule("0 0 0 * * *", () => {
  let today = Date.now();
  today = today.toISOString().slice(0, 10);
  const dueLoans = LoanService.getByDueDate(today);
  dueLoans.forEach((loan) => {
    const mailOptions = {
      from: "Alkemy Library",
      to: loan.user.email,
      subject: "Your loan is about to expire",
      html: `<h1>Library Reminder</h1>
            <p>Dear ${Loan.userId},</p>
            <p>I hope this email finds you well. We appreciate your enthusiasm for reading and your use of our library services.</p>
            <p>We wanted to gently remind you that the loan period for the book titled ${loan.bookId} is set to expire today.
            We hope you've enjoyed the book thus far!</p>
            <p>To ensure that the book remains available for other readers, 
            we kindly request that you return it to the library at your earliest convenience. If you require a renewal or have any concerns, please don't hesitate to reach out to us.</p>
            <p><strong>Return Date:</strong> ${loan.dueDate}</p>
            <p>Thank you for your prompt attention to this matter. Your cooperation helps us maintain the availability and accessibility of our library resources for the entire community.</p>
            <p>If you have already returned the book, please accept our gratitude.</p>
            <p>Warm regards,</p>`,
    };
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
