/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js";
import ApiError from "../errors/api.error.js";
import { BookRepository } from "./book.repository.js";

//ACCIÓN CON PRIVILEGIOS
const getAll = async (raw) => {
  return await db.Loan.findAll({
    include: [
      {
        model: db.User,
      },
      {
        model: db.Book,
      },
    ],
    raw,
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
    where: { isReturned: false, dueDate: !date },
    raw: true,
  });
};

const getActiveLoansByUserId = async (userId) => {
  const activeLoans = await db.Loan.findAll({
    where: { userId: userId, isReturned: false },
  });
  const nuberOfActiveLoans = activeLoans.length;
  return nuberOfActiveLoans;
};

const create = async (loan) => {
  return await db.Loan.create(loan);
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
  getActiveLoansByUserId,
  create,
  update,
};
