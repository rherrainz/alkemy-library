/*TODO: IMPORTACIÓN DE INDEX.DB */
import ApiError from "../errors/api.error.js";
import { db } from "./../db/index.db.js";
import { Op } from "sequelize";

//ACCIÓN CON PRIVILEGIOS
const getAll = async (raw) => {
  return await db.Collection.findAll({
    include: [
      {
        model: db.User,
        through: { attributes: [] },
      },
    ],
    raw,
  });
};

const update = async (id, collection) => {
  return await db.Collection.update(
    {
      collectionName: collection.collectionName,
    },
    { where: { id: id } }
  );
};

const getByUserId = async (userId) => {
  return await db.Collection.findAll({
    include: [
      {
        model: db.User,
        through: { attributes: ["userId"] },
        where: { id: userId },
      },
    ],
  });
};

const create = async (collection, bookIds) => {
  const books = await Promise.all(
    bookIds.map((bookId) => db.Book.findByPk(bookId))
  );
  
  const newCollection = await db.Collection.create(collection);
  console.log('Book IDs:', bookIds);
  
  if (books.length > 0) { // Check if any books were found
    // Assuming a bidirectional association, Sequelize should handle the association
    // If not, consider explicitly adding the books to the collection:
    await newCollection.addBooks(books); // Assuming the association method is addBooks
  } else {
    // Handle the case where no books are found with the given IDs.
    throw new Error("No books found with the specified IDs");
  }
  
  return newCollection;
};

const remove = async (id) => {
  return db.Collection.update(
    {
      isActive: false,
    },
    { where: { id: id } }
  );
};

export const CollectionRepository = {
  getAll,
  getByUserId,
  create,
  update,
  remove,
};
