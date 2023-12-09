import { UserService } from "../services/user.service.js";

const dueLoansMessage = (loan) => {
    const message = {
        from: "Alkemy Library",
        to: loan.user.email,
        subject: "Your loan is about to expire",
        html: `<h1>Library Reminder</h1>
            <p>Dear ${loan.userId},</p>
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
    return message;
};

const newLoanMessage = (loan) => {
    const message = {
        from: "Alkemy Library",
        to: loan.user.email,
        subject: "Loan completed",
        html: `<h1>Loan completed succesfully!</h1>
            <p>The book ${loan.bookId} has been reserved for you.</p>
            <p>From: ${loan.startDate}</p>
            <p>To: ${loan.dueDate}</p>
            <p>Enjoy our library!</p>`,
    };
    return message;
};

const newUserMessage = (user) => {
    const message = {
        from: "Alkemy Library",
        to: user.email,
        subject: "Welcome to Alkemy Library",
        html: `<h1>Welcome ${user.firstName} ${user.lastName}!</h1>
        <p>You have been registered successfully!</p>
        <p>Your registered email is: ${user.email}</p>
        <p>Enjoy our library!</p>`,
      };
      return message;
}

const newAuthorMessage = (author) => {
    const allUsersEmails = UserService.getUsersEmails();
    for (let i = 0; i < allUsersEmails.length; i++) {
        const message = {
            from: "Alkemy Library",
            to: allUsersEmails[i],
            subject: "New author registered",
            html: `<h1>New author registered!</h1>
            <p>The author ${author.firstName} ${author.lastName} has been registered successfully!</p>
            <p>Enjoy our library!</p>`,
        };
        return message;
    }
}

const newBookMessage = (book) => {
    const allUsersEmails = UserService.getUsersEmails();
    for (let i = 0; i < allUsersEmails.length; i++) {
        const message = {
            from: "Alkemy Library",
            to: allUsersEmails[i],
            subject: "New book registered",
            html: `<h1>New book registered!</h1>
            <p>The book ${book.title} has been registered successfully!</p>
            <p>Enjoy our library!</p>`,
        };
        return message;
    }
}


export default messages = {
    dueLoansMessage,
    newLoanMessage,
    newUserMessage,
    newAuthorMessage,
    newBookMessage
};