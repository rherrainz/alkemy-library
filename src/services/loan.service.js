import { LoanRepository } from "../repositories/loan.repository.js";
import { transporter } from "../messages/nodemailer.js";
import { messages } from "../messages/messages.js";

const getAll = async () => {
  return await LoanRepository.getAll();
};

const getById = async (id) => {
  return await LoanRepository.getById(id);
};

const getByAuthorId = async (authorId) => {
  return await LoanRepository.getByAuthorId(authorId);
};

const getByBookId = async (bookId) => {
  return await LoanRepository.getByBookId(bookId);
};

const getByLanguageId = async (languageId) => {
  return await LoanRepository.getByLanguageId(languageId);
};

const getByGenreId = async (genreId) => {
  return await LoanRepository.getByGenreId(genreId);
};

const getByDueDate = async (dueDate) => {
  return await LoanRepository.getByDueDate(dueDate);
}

const create = async (loan, arrayId) => {
  const newLoan = await LoanRepository.create(loan, arrayId);
  const message = messages.newLoanMessage(newLoan);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return newLoan;
};

const update = async (id, arrayId) => {
  return await LoanRepository.update(id, arrayId);
};

const remove = async (id) => {
  return await LoanRepository.remove(id);
};

export const LoanService = {
  getAll,
  getById,
  getByAuthorId,
  getByBookId,
  getByLanguageId,
  getByGenreId,
  getByDueDate,
  create,
  update,
  remove,
};
