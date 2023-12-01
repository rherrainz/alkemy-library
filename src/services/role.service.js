import { RoleRepository } from "../repositories/role.repository.js"

const create = async (role) => {
    console.log(role)
    return await RoleRepository.create(role)
}

export const RoleService = {
    create
}