/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"


//ACCIÓN CON PRIVILEGIOS
const getAll = async() => {
    return await db.Book.findAll();
}

const getById = async(id) => {
    return await db.Book.findByPk(id);
}

const getByAuthorId = async(authorId) => {
    return await db.Book.find({authorId: authorId});
}

const getByLanguageId = async(languageId) => {
    return await db.Book.find({languageId: languageId});
}

const getByGenreId = async(genreId) => {
    return await db.Book.find({genreId: genreId});
}

const create = async(book) => {
    return await db.Book.create(book)
}

const update = async(id, book)=> {
    return await db.Book.update(
        {
            title: book.title,
            ISBN: book.ISBN,
            edition: book.edition,
            year: book.year,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            avgScore: book.avgScore,
            isLoaned: book.isLoaned,
            isLongLoan: book.isLongLoan,
            isActive: book.isActive
        }, {where: {id: id}}
        )
}

const remove = async(id) => {
    return db.Book.update(
        {
            isActive: false
        }, {where: {id: id}}
    )
}

export const BookRepository = {
    getAll,
    getById,
    getByAuthorId,
    getByLanguageId,
    getByGenreId,
    create,
    update,
    remove
}