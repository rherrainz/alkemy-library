import { LoanRepository } from "../repositories/loan.repository.js";

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

const create = async (loan, arrayId) => {
  return await LoanRepository.create(loan, arrayId);
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
  create,
  update,
  remove,
};
