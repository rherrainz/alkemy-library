/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js";

//ACCIÓN CON PRIVILEGIOS
const getAll = async () => {
  return await db.Language.findAll();
};

const create = async (language) => {
  return await db.Language.create(language);
};

export const LanguageRepository = {
  getAll,
  create,
};
