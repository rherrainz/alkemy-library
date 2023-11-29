import { UserRepository } from "../repositories/user.repository.js"

const getById = async (id) => {
    return await UserRepository.getById(id)
}

export const UserService = {
    getById
}