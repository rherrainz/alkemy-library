/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js";

//ACCIÓN CON PRIVILEGIOS
const getAll = async (raw) => {
  return await db.Author.findAll(raw);
};

const getByAuthorId = async (id) => {
  return await db.Author.findByPk(id);
};

const create = async (author) => {
  return await db.Author.create(author);
};

const update = async (id, author) => {
  return await db.Author.update(
    {
      firstName: author.firstName,
      lastName: author.lastName,
      birthDate: author.birthDate,
      nationality: author.nationality,
    },
    { where: { id: id } }
  );
};

const remove = async (id) => {
  return db.Author.update(
    {
      isActive: false,
    },
    { where: { id: id } }
  );
};

export const AuthorRepository = {
  getAll,
  getByAuthorId,
  create,
  update,
  remove,
};
