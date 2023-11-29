import { AuthorRepository } from "../repositories/author.repository.js";

const getAll = async() => {
    return await AuthorRepository.getAll();
}

const getByAuthorId = async(authorId) => {
    return await AuthorRepository.getByAuthorId(authorId)
}

const create = async(author) => {
    return await AuthorRepository.create(author)
}

const update = async(authorId, author) => {
    return await AuthorRepository.update(authorId, author)
}

const remove = async(authorId) => {
    return await AuthorRepository.remove(authorId)
}

export const AuthorService = {
    getAll,
    getByAuthorId,
    create,
    update,
    remove
}