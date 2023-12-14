import { LoanRepository } from "../repositories/loan.repository.js";
import { transporter } from "../messages/nodemailer.js";
import { messages } from "../messages/messages.js";
import ApiError from "../errors/api.error.js";
import { info } from "../log/logger.log.js";

import { UserRepository } from "../repositories/user.repository.js";
import { BookRepository } from "../repositories/book.repository.js";
import generateCSV from "../utils/csv.util.js";

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
};

const getByUserId = async (userId) => {
  return await LoanRepository.getByUserId(userId);
};

const getOldDueLoans = async () => {
  return await LoanRepository.getOldDueLoans();
};

const create = async (loan, user, bookId) => {
  try {
    const numberOfUserLoans = await LoanRepository.getActiveLoansByUserId(
      user.id
    );
    if (numberOfUserLoans >= 3) {
      throw new ApiError("You can not borrow more than 3 books", 401);
    }

    const book = await BookRepository.getById(bookId);
    if (!book) {
      throw new ApiError("Book not found", 404);
    }
    if (book.isLoaned) {
      throw new ApiError("Book is already loaned", 400);
    }

    loan.userId = user.id;
    const { id: userId } = user;

    const genreId = Array.isArray(book["genres.id"])
      ? book["genres.id"][0]
      : book["genres.id"];
    const authorId = Array.isArray(book["authors.id"])
      ? book["authors.id"][0]
      : book["authors.id"];

    const [updateUser, loanCreated, updateBook] = await Promise.all([
      UserRepository.updateLastInfo(userId, authorId, genreId),
      LoanRepository.create(loan),
      BookRepository.bookLoaned(bookId),
    ]);

    const message = messages.newLoanMessage(loanCreated, user.email);
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  //SE ACTUALIZA EL LOG
  info(user.email, `Préstamo realizado | Libro ID: ${bookId}`);


    return loanCreated;
  } catch (error) {
    throw error;
  }
};

const update = async (id, arrayId) => {
  return await LoanRepository.update(id, arrayId);
};

const remove = async (id) => {
  return await LoanRepository.remove(id);
};

const exportToCSV = async () => {
  const data = await LoanRepository.getAll({ raw: true });
  const fileName = await generateCSV(data);
  return `/export-csv/download/${fileName}`;
};

export const LoanService = {
  getAll,
  getById,
  getByAuthorId,
  getByBookId,
  getByLanguageId,
  getByUserId,
  getByGenreId,
  getByDueDate,
  getOldDueLoans,
  create,
  update,
  remove,
  exportToCSV,
};
