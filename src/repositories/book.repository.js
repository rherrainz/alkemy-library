/*TODO: IMPORTACIÓN DE INDEX.DB */
import ApiError from "../errors/api.error.js";
import { db } from "./../db/index.db.js";
import { Op } from "sequelize";

//ACCIÓN CON PRIVILEGIOS
const getAll = async (raw) => {
  return await db.Book.findAll({
    include: [
      {
        model: db.Author, //TABLA RELACIONADA A LA QUERY
        through: { attributes: [] }, //COLUMNA DE LA TABLA INTERMEDIA
      },
      {
        model: db.Genre,
        through: { attributes: [] },
      },
      {
        model: db.Language,
        through: { attributes: [] },
      },
    ],
    raw,
  });
};
const getAllActive = async () => {
  return await db.Book.findAll({
    include: [
      {
        model: db.Author,
        through: { attributes: [] },
      },
      {
        model: db.Genre,
        through: { attributes: [] },
      },
      {
        model: db.Language,
        through: { attributes: [] },
      },
    ],
    where: {
      isActive: true,
    },
  });
};

const getByParams = async (
  authorName = "",
  bookTitle = "",
  genreName = "",
  options
) => {
  const books = await db.Book.findAll({
    include: [
      {
        model: db.Author,
        // Muestro los atributos firstName y lastName
        attributes: ["firstName", "lastName"],
        through: { attributes: [] },
        where: {
          [Op.or]: [
            { firstName: { [Op.like]: `%${authorName}%` } },
            { lastName: { [Op.like]: `%${authorName}%` } },
          ],
        },
      },
      {
        model: db.Genre,
        // Muestro el atributo genre
        attributes: ["genre"],
        through: { attributes: [] },
        where: {
          genre: { [Op.like]: `%${genreName}%` },
        },
      },
    ],
    where: {
      // Coloque Op.or para el caso en que no se indique un title
      [Op.or]: [{ title: { [Op.like]: `%${bookTitle}%` } }],
    },
    //Utilizo el spread operator para separar los parametros offset y limit
    ...options,
  });

  return books;
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
  return await db.Book.findByPk(id, {
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
    raw: true,
  });
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
      isLoaned: false,
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
  try {
    const book = await db.Book.findByPk(id);

    await book.update({
      isLoaned: false,
    });

    //Devolver los datos del libro que vuelve a estar disponible
    const { title, edition } = book.toJSON();
    return { title, edition };
  } catch (error) {
    throw error;
  }
};

const bookLoaned = async (id) => {
  try {
    const book = await db.Book.findByPk(id);

    await book.update({
      isLoaned: true,
    });

    const { title, edition } = book.toJSON();
    return { title, edition };
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  return db.Book.update(
    {
      isActive: false,
    },
    { where: { id: id } }
  );
};

const getByLastAuthor = async (authorId) => {
  return await db.Book.findAll({
    include: {
      model: db.Author,
      as: "authors",
      through: { attributes: [] },
      attributes: ["id", "firstName", "lastName"],
      where: {
        id: authorId,
      },
    },
    where: {
      isLoaned: false,
      isActive: true,
    },
    limit: 5,
  });
};

const getByLastGenre = async (genreId) => {
  return await db.Book.findAll({
    include: {
      model: db.Genre,
      as: "genres",
      through: { attributes: [] },
      attributes: ["id", "genre"],
      where: {
        id: genreId,
      },
    },
    where: {
      isLoaned: false,
      isActive: true,
    },
    limit: 5,
  });
};

export const BookRepository = {
  getAll,
  getAllActive,
  getByParams,
  getOnlyLoan,
  getById,
  getByAuthorId,
  getByLanguageId,
  getByGenreId,
  getByAuthorOrTitle,
  create,
  update,
  returnBook,
  bookLoaned,
  remove,
  getByLastGenre,
  getByLastAuthor,
};
