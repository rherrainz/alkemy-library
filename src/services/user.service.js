import { UserRepository } from "../repositories/user.repository.js"

const getAll = async() => {
    return await UserRepository.getAll();
}

const getById = async (id) => {
    return await UserRepository.getById(id)
}

export const UserService = {
    getAll,
    getById
}