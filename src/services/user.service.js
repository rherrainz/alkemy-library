import { UserRepository } from "../repositories/user.repository.js"
// import { PasswordUtil } from "../utils/password.util.js";
import { hashPassword, comparePassword } from "../utils/password.util.js"
import { encode } from "../utils/token.util.js";

const getAll = async () => {
    return await UserRepository.getAll();
}

const getById = async (id) => {
    return await UserRepository.getById(id)
}

const create = async (user) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    return await UserRepository.create(user);
}

const update = async (id, user) => {
    return await UserRepository.update(id, user)
}

const remove = async (id) => {
    return await UserRepository.remove(id)
}

const login = async (email, password) => {
    const user = await UserRepository.getUserByEmail(email)
    if (!user) throw new Error("User not found")
    const isPasswordValid = await comparePassword(password, user.dataValues.password)
    if (!isPasswordValid) throw new Error("Invalid credentials")
    const token = encode({
        user: user.email,
        roleId: user.roleId,
    })
    return token
}

export const UserService = {
    getAll,
    getById,
    create,
    update,
    remove,
    login
}