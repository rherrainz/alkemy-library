import { HTTP_STATUSES } from "../constants/http.js";
import { LoanService } from "../services/loan.service.js";
import ApiError from "../errors/api.error.js";
import { info } from "../log/logger.log.js";
import {transporter} from "../messages/nodemailer.js";

const getAll = async (req, res, next) => {
  try {
    const result = await LoanService.getAll();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await LoanService.getById(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const { bookId } = req.body;
    const result = await LoanService.create(req.body, { user, bookId });
    info(user.email, `Préstamo realizado | Libro ID: ${bookId}`);
    const mailOptions = {
      from: "Alkemy Library",
      to: user.email,
      subject: "Loan completed",
      html: `<h1>Loan completed succesfully!</h1>
      <p>The book ${bookId} has been reserved for you.</p>
      <p>From: ${result.startDate}</p>
      <p>To: ${result.dueDate}</p>
      <p>Enjoy our library!</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    })
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await LoanService.remove(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const edit = async (req, res, next) => {
    try{
        const result = await LoanService.update(req.params.id, req.params.arrayId);
        res.status(HTTP_STATUSES.ACCEPTED).json({ data: result})
    } catch (error){
        next(new ApiError(error.message))
    }
}

export const LoanController = {
  getAll,
  getById,
  create,
  edit,
  remove,
};
