import { AuthorRepository } from "../repositories/author.repository.js";

const getAll = async() => {
    return await AuthorRepository.getAll();
}

const getByAuthorId = async(id) => {
    return await AuthorRepository.getByAuthorId(id)
}

const create = async(author) => {
    return await AuthorRepository.create(author)
}

const update = async(id, author) => {
    return await AuthorRepository.update(authorId, author)
}

const remove = async(id) => {
    return await AuthorRepository.remove(id)
}

export const AuthorService = {
    getAll,
    getByAuthorId,
    create,
    update,
    remove
}