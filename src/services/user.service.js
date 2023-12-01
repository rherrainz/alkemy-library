import { UserRepository } from "../repositories/user.repository.js"
import { PasswordUtil } from "../utils/password.util.js";

const getAll = async () => {
    return await UserRepository.getAll();
}

const getById = async (id) => {
    return await UserRepository.getById(id)
}

const create = async (user) => {
    const hashedPassword = await PasswordUtil.hashPassword(user.password);
    user.password = hashedPassword;
    return await UserRepository.create(user);
}

const update = async (id, user) => {
    return await UserRepository.update(id, user)
}

const remove = async (id) => {
    return await UserRepository.remove(id)
}

export const UserService = {
    getAll,
    getById,
    create,
    update,
    remove
}