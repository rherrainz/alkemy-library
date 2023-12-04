import { LanguageRepository } from "../repositories/language.repository.js";

const getAll = async () => {
  return await LanguageRepository.getAll();
};

const create = async (language) => {
  return await LanguageRepository.create(language);
};

export const LanguageService = {
  getAll,
  create,
};
