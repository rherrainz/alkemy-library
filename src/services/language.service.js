import { LanguageRepository } from "../repositories/language.repository.js";
import generateCSV from "../utils/csv.util.js";

const getAll = async () => {
  return await LanguageRepository.getAll();
};

const create = async (language) => {
  return await LanguageRepository.create(language);
};

const exportToCSV = async () => {
  const data = await LanguageRepository.getAll({ raw: true });
  const fileName = await generateCSV(data);
  return `/export-csv/download/${fileName}`;
};

export const LanguageService = {
  getAll,
  create,
  exportToCSV,
};
