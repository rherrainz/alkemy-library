import { GenreRepository } from "../repositories/genre.repository.js";

const getAll = async () => {
  return await GenreRepository.getAll();
};

const getById = async (id) => {
  return await GenreRepository.getById(id);
};

const create = async (genre) => {
  return await GenreRepository.create(genre);
};

const update = async (id, book) => {
  return await GenreRepository.update(id, genre);
};

const remove = async (id) => {
  return await GenreRepository.remove(id);
};

export const GenreService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
