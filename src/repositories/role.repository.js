/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"

const getById = async (id) => {
    return await db.Role.findByPk(id, { raw: true });
}

const create = async (role) => {
    return await db.Role.create(role)
}

export const RoleRepository = {
    create,
    getById
}