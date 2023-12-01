/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"

const create = async (role) => {
    return await db.Role.create(role)
}

export const RoleRepository = {
    create
}