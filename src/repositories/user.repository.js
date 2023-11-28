/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"


//ACCIÓN CON PRIVILEGIOS
const getAll = async() => {
    return await db.User.findAll();
}

const getById = async(id) => {
    return await db.User.findByPk(id);
}

const create = async(user) => {
    return await db.User.create(user)
}

const update = async(id, user)=> {
    return await db.User.update(
        {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roleId: user.roleId,
            isActive: user.isActive
        }, {where: {id: id}}
        )
}

const remove = async(id) => {
    return db.User.update(
        {
            isActive: false
        }, {where: {id: id}}
    )
}

export const UserRepository = {
    getAll,
    getById,
    create,
    update,
    remove
}