import { BookRepository } from "../repositories/book.repository.js";

const getAll = async () => {
  return await BookRepository.getAll();
};

const getAllActive = async () => {
  return await BookRepository.getAllActive();
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
  return await BookRepository.create(book, { authorId, genreId, languageId });
};

const update = async (id, book) => {
  return await BookRepository.update(id, book);
};

const returnBook = async (id) => {
  return await BookRepository.returnBook(id);
};

const remove = async (id) => {
  return await BookRepository.remove(id);
};

export const BookService = {
  getAll,
  getAllActive,
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
