import { ReviewRepository } from "../repositories/review.repository.js";
import generateCSV from "../utils/csv.util.js";

const getAll = async () => {
  return await ReviewRepository.getAll();
};

const getById = async (id) => {
  return await ReviewRepository.getById(id);
};

const getByUserId = async (userId) => {
  return await ReviewRepository.getByUserId(userId);
};

const getByBookId = async (bookId) => {
  return await ReviewRepository.getByBookId(bookId);
};

const create = async (review, user) => {
  return await ReviewRepository.create(review, user);
};

const update = async (id, review) => {
  return await ReviewRepository.update(id, review);
};

const exportToCSV = async () => {
  const data = await ReviewRepository.getAll({ raw: true });
  const fileName = await generateCSV(data);
  return `/export-csv/download/${fileName}`;
};

export const ReviewService = {
  getAll,
  getById,
  getByUserId,
  getByBookId,
  create,
  update,
  exportToCSV,
};
