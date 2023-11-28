/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"


//ACCIÓN CON PRIVILEGIOS
const getAll = async() => {
    return await db.Author.findAll();
}

const getById = async(id) => {
    return await db.Author.findByPk(id);
}


const create = async(author) => {
    return await db.Author.create(author)
}

const update = async(id, author)=> {
    return await db.Author.update(
        {
            firstName: author.firstName,
            lastName: author.lastName,
            birthDate: author.birthDate,
            nationality: author.nationality
        }, {where: {id: id}}
        )
}


export const AuthorRepository = {
    getAll,
    getById,
    create,
    update
}