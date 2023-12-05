/*TODO: IMPORTACIÓN DE INDEX.DB */
import ApiError from "../errors/api.error.js";
import { db } from "./../db/index.db.js";

//ACCIÓN CON PRIVILEGIOS
const getAll = async () => {
  return await db.Book.findAll({
    include: [
      {
        model: db.Author, //TABLA RELACIONADA A LA QUERY
        through: { attributes: ["authorId"] }, //COLUMNA DE LA TABLA INTERMEDIA
      },
      {
        model: db.Genre,
        through: { attributes: ["genreId"] },
      },
      {
        model: db.Language,
        through: { attributes: ["languageId"] },
      },
    ],
  });
};

//TODO: RETORNA TODOS LOS LIBROS QUE ESTÉN EN PRÉSTAMO ORDENADOS DE MANERA ASC SEGÚN FECHA DE SOLICITUD
const getOnlyLoan = async() => {

    return await db.Book.findAll({
    include: [ //TODO: ASOCIACIÓN PRINCIPAL CON PRÉSTAMO
        {
            model: db.Loan,
            attributes: ['startDate'], //ATRIBUTOS NECESARIOS,

            include: [ //TODO: SEGUNDA ASOCIACIÓN PARA OBTENER DATOS DEL USUARIO QUE SOLICITÓ EL PRÉSTAMO
                {
                    model: db.User,
                    attributes: ['firstName']
                }
            ]
        },
    ],
    where: {
        isLoaned: true
    },
    order: [
        [db.Loan, 'startDate', 'DESC']
    ],
    });
}

const getById = async (id) => {
  return await db.Book.findByPk(id);
};

const getByAuthorId = async (authorId) => {
  return await db.Book.findAll({
    include: [
      {
        model: db.Author, //TABLA RELACIONADA A LA QUERY
        through: { attributes: ["authorId"] }, //COLUMNA DE LA TABLA INTERMEDIA
      },
    ],
    where: {
      "$Authors.id$": authorId,
      isLoaned: false, //FILTRO SEGÚN EL AUTOR
    },
  });
};

const getByAuthorOrTitle = async (author, title) => {
  return await db.Book.findAll({
    include: [
      {
        model: db.Author, //TABLA RELACIONADA A LA QUERY
        through: { attributes: ["authorId"] }, //COLUMNA DE LA TABLA INTERMEDIA
      },
    ],
    where: {
      "$Authors.name$": author,
      title: title,
      isLoaned: false, //FILTRO SEGÚN EL AUTOR
    },
  });
};

const getByLanguageId = async (languageId) => {
  return await db.Book.find({ languageId: languageId });
};

const getByGenreId = async (genreId) => {
  return await db.Book.findAll({
    include: [
      {
        model: db.Genre,
        through: { attributes: ["genreId"] },
      },
    ],
    where: {
      "$Genres.id$": genreId,
    },
  });
};

//TODO: VERIFICAR ARRAY
const create = async(book, arrayId) => {

    // TODO: PRIMERO SE DEBE VERIFICAR QUE LOS AUTORES EXISTAN SEGÚN LOS IDS
    const authors = await Promise.all(arrayId.authorId.map(authorId => db.Author.findByPk(authorId)));
    const genres = await Promise.all(arrayId.genreId.map(genreId => db.Genre.findByPk(genreId)));
    const languages = await Promise.all(arrayId.languageId.map(languageId => db.Language.findByPk(languageId)));

    // Verificar que todos los autores existan
    if(authors.some(author => !author)) {
        throw new ApiError('Author does not exist', 404);
    }

    if(genres.some(genre => !genre)){
        throw new ApiError('Gender does not exist', 404);
    }

    if(languages.some(language => !language)){
        throw new ApiError('Language does not exist', 404);
    }

    // TODO: SE CREA EL LIBRO
    const bookCreated = await db.Book.create(book);

    await bookCreated.addAuthor(authors);
    await bookCreated.addGenre(genres);
    await bookCreated.addLanguage(languages);

    return bookCreated;
}

const update = async (id, book) => {
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
      isActive: book.isActive,
    },
    { where: { id: id } },
  );
};

const remove = async (id) => {
  return db.Book.update(
    {
      isActive: false,
    },
    { where: { id: id } },
  );
};

export const BookRepository = {
    getAll,
    getOnlyLoan,
    getById,
    getByAuthorId,
    getByLanguageId,
    getByGenreId,
    getByAuthorOrTitle,
    create,
    update,
    remove
}
