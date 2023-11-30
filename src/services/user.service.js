import { UserRepository } from "../repositories/user.repository.js"

const getAll = async () => {
    return await UserRepository.getAll();
}

const getById = async (id) => {
    return await UserRepository.getById(id)
}

const create = async (user) => {
    return await UserRepository.create(user)
}

const update = async (id, user) => {
    return await UserRepository.update(id, book)
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