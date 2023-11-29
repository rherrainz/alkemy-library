/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"


//ACCIÓN CON PRIVILEGIOS
const getAll = async() => {
    return await db.Author.findAll();
}

const getByAuthorId = async(authorId) => {
    return await db.Author.findByPk(authorId);
}

const create = async(author) => {
    return await db.Author.create(author)
}

const update = async(authorId, author)=> {
    return await db.Author.update(
        {
            firstName: author.firstName,
            lastName: author.lastName,
            birthDate: author.birthDate,
            nationality: author.nationality
        }, {where: {authorId: authorId}}
        )
}

const remove = async(authorId) => {
    return db.Author.update(
        {
            isActive: false
        }, {where: {authorId: authorId}}
    )
}


export const AuthorRepository = {
    getAll,
    getByAuthorId,
    create,
    update,
    remove
}