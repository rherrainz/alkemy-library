/*TODO: IMPORTACIÓN DE INDEX.DB */
import ApiError from "../errors/api.error.js";
import { db } from "./../db/index.db.js"


//ACCIÓN CON PRIVILEGIOS
const getAll = async() => {
    return await db.Book.findAll(
        {
            include: [ 
                {
                    model: db.Author, //TABLA RELACIONADA A LA QUERY
                    through: { attributes: ['authorId'] } //COLUMNA DE LA TABLA INTERMEDIA
                },
                {
                    model: db.Genre,
                    through: { attributes: ['genreId'] }
                },
                {
                    model: db.Language,
                    through: { attributes: ['languageId'] } 
                }
            ],
        });
}

const getById = async(id) => {
    return await db.Book.findByPk(id);
}

const getByAuthorId = async(authorId) => {
    return await db.Book.findAll(
        {
            include: [ 
                {
                    model: db.Author, //TABLA RELACIONADA A LA QUERY
                    through: { attributes: ['authorId'] } //COLUMNA DE LA TABLA INTERMEDIA
                } 
            ],
            where: {
                '$Authors.id$': authorId,
                isLoaned: false //FILTRO SEGÚN EL AUTOR
            }
        });
}

const getByLanguageId = async(languageId) => {
    return await db.Book.find({languageId: languageId});
}

const getByGenreId = async(genreId) => {
    return await db.Book.findAll(
        {
            include: [
                {
                    model: db.Genre,
                    through: { attributes: ['genreId']}
                }
            ],
            where: {
                '$Genres.id$': genreId
            }
        });
}

//TODO: VERIFICAR ARRAY
const create = async(book, arrayId) => {

    //TODO: PRIMERO SE DEBE VERIFICAR QUE EL AUTOR EXISTA SEGÚN EL ID
    const author = await db.Author.findByPk(arrayId.authorId);
    const genre = await db.Genre.findByPk(arrayId.genreId);
    const language = await db.Language.findByPk(arrayId.languageId);

    if(!author || !genre || !language)
    {
        throw new ApiError('Author | genre | language not found', 404);
    }

    
    //TODO: SE CREA EL LIBRO
    const bookCreated = await db.Book.create(book);

    //TODO: POR ÚLTIMO SE ASOCIA CON EL AUTOR
    await bookCreated.addAuthor(author);
    await bookCreated.addGenre(genre);
    await bookCreated.addLanguage(language);

    return bookCreated;
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