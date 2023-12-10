import { BookRepository } from "../repositories/book.repository.js";
import { messages } from "../messages/messages.js";
import { transporter } from "../messages/nodemailer.js";

const getAll = async () => {
  return await BookRepository.getAll();
};

const getAllActive = async () => {
  return await BookRepository.getAllActive();
};

const getByParams = async (authorName, bookTitle, genreName, page) => {
  let options = {};
  if (page && !isNaN(page)) {
    options = {
      offset: (page - 1) * 10,
      limit: 10,
    };
  }
  return await BookRepository.getByParams(
    authorName,
    bookTitle,
    genreName,
    options
  );
};

const getOnlyLoan = async () => {
  return await BookRepository.getOnlyLoan();
};

const getById = async (id) => {
  return await BookRepository.getById(id);
};

const getByAuthorId = async (authorId) => {
  return await BookRepository.getByAuthorId(authorId);
};

const getByLanguageId = async (languageId) => {
  return await BookRepository.getByLanguageId(languageId);
};

const getByGenreId = async (genreId) => {
  return await BookRepository.getByGenreId(genreId);
};

const getByAuthorOrTitle = async (author, title) => {
  return await BookRepository.getByAuthorOrTitle(author, title);
};

const create = async (book, { authorId, genreId, languageId }) => {
  const newBook = await BookRepository.create(book, {
    authorId,
    genreId,
    languageId,
  });
  const message = messages.newBookMessage(newBook);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return newBook;
};

const update = async (id, book) => {
  return await BookRepository.update(id, book);
};

const returnBook = async (id, io) => {
  const result = await BookRepository.returnBook(id);

  //Emitir el evento al cliente
  io.emit("notification", {
    text: `El libro ${result.title} está disponible en la versión ${result.edition}`,
  });
  return result;
};

const remove = async (id) => {
  return await BookRepository.remove(id);
};

export const BookService = {
  getAll,
  getAllActive,
  getByParams,
  getOnlyLoan,
  getById,
  getByAuthorId,
  getByLanguageId,
  getByGenreId,
  getByAuthorOrTitle,
  create,
  update,
  returnBook,
  remove,
};
