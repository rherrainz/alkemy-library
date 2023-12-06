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
const getAllActive = async () => {
  return await db.Book.findAll({
    include: [
      {
        model: db.Author,
        through: { attributes: ["authorId"] },
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
    where: {
      isActive: true,
    },
  });
};

//TODO: RETORNA TODOS LOS LIBROS QUE ESTÉN EN PRÉSTAMO ORDENADOS DE MANERA ASC SEGÚN FECHA DE SOLICITUD
const getOnlyLoan = async () => {
  return await db.Book.findAll({
    include: [
      //TODO: ASOCIACIÓN PRINCIPAL CON PRÉSTAMO
      {
        model: db.Loan,
        attributes: ["startDate"], //ATRIBUTOS NECESARIOS,

        include: [
          //TODO: SEGUNDA ASOCIACIÓN PARA OBTENER DATOS DEL USUARIO QUE SOLICITÓ EL PRÉSTAMO
          {
            model: db.User,
            attributes: ["firstName"],
          },
        ],
      },
    ],
    where: {
      isLoaned: true,
    },
    order: [[db.Loan, "startDate", "DESC"]],
  });
};

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

const create = async (book, { authorId, genreId, languageId }) => {
  //PRIMERO SE DEBE VERIFICAR QUE LOS AUTORES EXISTAN SEGÚN LOS IDS
  const authors = await Promise.all(
    authorId.map((authorId) => db.Author.findByPk(authorId))
  );
  const genres = await Promise.all(
    genreId.map((genreId) => db.Genre.findByPk(genreId))
  );
  const languages = await Promise.all(
    languageId.map((languageId) => db.Language.findByPk(languageId))
  );

  // Verificar que todos los autores existan
  if (authors.some((author) => !author)) {
    throw new ApiError("Author does not exist", 404);
  }

  if (genres.some((genre) => !genre)) {
    throw new ApiError("Gender does not exist", 404);
  }

  if (languages.some((language) => !language)) {
    throw new ApiError("Language does not exist", 404);
  }

  //SE CREA EL LIBRO
  const bookCreated = await db.Book.create(book);

  await bookCreated.addAuthor(authors);
  await bookCreated.addGenre(genres);
  await bookCreated.addLanguage(languages);

  return bookCreated;
};

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
    { where: { id: id } }
  );
};

const returnBook = async (id) => {
  return db.Book.update(
    {
      isLoaned: false,
    },
    { where: { id: id } }
  );
};

const remove = async (id) => {
  return db.Book.update(
    {
      isActive: false,
    },
    { where: { id: id } }
  );
};

export const BookRepository = {
  getAll,
  getAllActive,
  getOnlyLoan,
  getById,
  getByAuthorId,
  getByLanguageId,
  getByGenreId,
  getByAuthorOrTitle,
  create,
  update,
  returnBook,
  remove,
};
