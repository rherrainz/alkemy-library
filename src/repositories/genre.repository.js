/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js";

//ACCIÓN CON PRIVILEGIOS
const getAll = async (raw) => {
  return await db.Genre.findAll(raw);
};

const getById = async (id) => {
  return await db.Genre.findByPk(id);
};

const create = async (Genre) => {
  return await db.Genre.create(Genre);
};

const update = async (id, Genre) => {
  return await db.Genre.update(
    {
      startDate: Genre.startDate,
      dueDate: Genre.dueDate,
    },
    { where: { id: id } }
  );
};

export const GenreRepository = {
  getAll,
  getById,
  create,
  update,
};
