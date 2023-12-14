/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js";

//ACCIÓN CON PRIVILEGIOS
const getAll = async (raw) => {
  return await db.Language.findAll(raw);
};

const create = async (language) => {
  return await db.Language.create(language);
};

export const LanguageRepository = {
  getAll,
  create,
};
