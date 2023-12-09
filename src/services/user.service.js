import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import ApiError from "../errors/api.error.js";
import { transporter } from "../messages/nodemailer.js";
import { messages } from "../messages/messages.js";

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

const getByParams = async ({email, name,surname}) => {
  return await UserRepository.getByParams({email, name,surname});
}

const getById = async (id) => {
  return await UserRepository.getById(id);
};

const create = async (user) => {
  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;
  const message = messages.newUserMessage(user);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
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
  getByParams,
  getById,
  create,
  update,
  deleteById,
};
