/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js";
import ApiError from "../errors/api.error.js";

//ACCIÓN CON PRIVILEGIOS
const getAll = async () => {
  return await db.Loan.findAll({
    include: [
      {
        model: db.User,
      },
      {
        model: db.Book,
      },
    ],
  });
};

const getById = async (id) => {
  return await db.Loan.findByPk(id, {
    include: [
      {
        model: db.User,
      },
      {
        model: db.Book,
      },
    ],
  });
};

const getByUserId = async (userId) => {
  return await db.Loan.findAll({ where: { userId: userId } });
};

const getByBookId = async (bookId) => {
  return await db.Loan.findAll({ where: { bookId: bookId } });
};

const getByDueDate = async (dueDate) => {
  return await db.Loan.findAll({
    include: [
      {
        model: db.User,
        attributes: ["email"],
      },
    ],
    where: { dueDate: dueDate },
    raw: true,
  });

  // console.log(result[0]["user.email"]);
};

const getOldDueLoans = async () => {
  const date = new Date();
  date.setDate(date.getDate());
  return await db.Loan.findAll({
    include: [
      {
        model: db.User,
        attributes: ["email"],
      },
    ],
    where: { isReturned: false , dueDate: !date},
    raw: true,
  });
};

const create = async (loan, arrayId) => {
  //TODO: PRIMERO SE DEBE VERIFICAR QUE EXISTA EL LIBRO Y EL USUARIO
  const book = await db.Book.findByPk(arrayId.bookId);

  if (!book) {
    throw new ApiError("Book not found", 404);
  }

  // Check if the book is already loaned
  if (book.isLoaned) {
    throw new ApiError("Book is already loaned", 400); //VER ESTO
  }

  loan.userId = arrayId.user.id;

  //TODO: SE CREA EL PRÉSTAMO
  const loanCreated = await db.Loan.create(loan);

  // Set isLoaned to true for the book
  await book.update({ isLoaned: true });

  return loanCreated;
};

const update = async (id, loan) => {
  return await db.Loan.update(
    {
      startDate: loan.startDate,
      dueDate: loan.dueDate,
    },
    { where: { id: id } }
  );
};

export const LoanRepository = {
  getAll,
  getById,
  getByUserId,
  getByBookId,
  getByDueDate,
  getOldDueLoans,
  create,
  update,
};
