import { BookRepository } from "../repositories/book.repository.js";

const getAll = async() => {
    return await BookRepository.getAll();
}

const getById = async(id) => {
    return await BookRepository.getById(id)
}

const getByAuthorId = async(authorId) => {
    return await BookRepository.getByAuthorId(authorId)
}

const getByLanguageId = async(languageId) => {
    return await BookRepository.getByLanguageId(languageId)
}

const getByGenreId = async(genreId) => {
    return await BookRepository.getByGenreId(genreId)
}

const create = async(book, arrayId) => {
    return await BookRepository.create(book, arrayId)
}

const update = async(id, book) => {
    return await BookRepository.update(id, book)
}

const remove = async(id) => {
    return await BookRepository.remove(id)
}

export const BookService = {
    getAll,
    getById,
    getByAuthorId,
    getByLanguageId,
    getByGenreId,
    create,
    update,
    remove
}