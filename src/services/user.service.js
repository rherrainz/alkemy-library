import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import ApiError from "../errors/api.error.js";

//MÉTODO UTILIZADO EN EL AUTH SERVICE
const findUserByEmailAndPassword = async (email, password) => {
  const user = await UserRepository.getUserByEmail(email);
  if (!user) throw new ApiError("Credenciales incorrectas");
  const isPasswordValid = await comparePassword(
    password,
    user.dataValues.password,
  );
  if (isPasswordValid) return user.dataValues;
};

const getAll = async (page) => {
  let options = {};
  if (page && !isNaN(page)) {
    options = {
      offset: (page - 1) * 10,
      limit: 10,
    };
  }
  return await UserRepository.getAll(options);
};

const getById = async (id) => {
  return await UserRepository.getById(id);
};

const create = async (user) => {
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
  return await UserRepository.create(user);
};

const update = async (id, user) => {
  return await UserRepository.update(id, user);
};

const deleteById = async (id) => {
  return await UserRepository.remove(id);
};

export const UserService = {
  findUserByEmailAndPassword,
  getAll,
  getById,
  create,
  update,
  deleteById,
};
