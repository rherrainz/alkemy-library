/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js";

//ACCIÓN CON PRIVILEGIOS
const getAll = async (options) => {
  return await db.User.findAll(options);
};

//MÉTODO QUE RETORNA LOS USUARIOS QUE COINCIDAN CON LOS PARÁMETROS ENVIADOS EN LA QUERY
const getByParams = async ({ email, name, surname }) => {
  const whereClause = {};

  if (email) {
    whereClause.email = email;
  }

  if (name) {
    whereClause.firstName = name;
  }

  if (surname) {
    whereClause.lastName = surname;
  }

  return await db.User.findAll({
    where: whereClause,
  });
};

const getById = async (id) => {
  return await db.User.findByPk(id);
};

const getUsersEmails = async () => {
  const allUsersEmails = await db.User.findAll({
    attributes: ["email"],
  });
  return allUsersEmails;
};

const create = async (user) => {
  return await db.User.create(user);
};

const update = async (id, user) => {
  return await db.User.update(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      isActive: user.isActive,
    },
    { where: { id: id } }
  );
};

const remove = async (id) => {
  return await db.User.update(
    {
      isActive: false,
    },
    { where: { id: id, isActive: true } }
  );
};

const getUserByEmail = async (email) => {
  return await db.User.findOne({ where: { email } });
};

const updateLastInfo = async (userId, authorId, genreId) => {
  return await db.User.update(
    {
      lastAuthor: authorId,
      lastGenre: genreId,
    },
    {
      where: {
        id: userId,
      },
    }
  );
};

export const UserRepository = {
  getAll,
  getByParams,
  getById,
  getUsersEmails,
  create,
  update,
  remove,
  getUserByEmail,
  updateLastInfo,
};
