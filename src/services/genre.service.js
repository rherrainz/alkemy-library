import { GenreRepository } from "../repositories/genre.repository.js";
import generateCSV from "../utils/csv.util.js";

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

const exportToCSV = async () => {
  const data = await GenreRepository.getAll({ raw: true });
  const fileName = await generateCSV(data);
  return `/export-csv/download/${fileName}`;
};

export const GenreService = {
  getAll,
  getById,
  create,
  update,
  remove,
  exportToCSV,
};
