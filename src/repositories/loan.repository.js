/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"


//ACCIÓN CON PRIVILEGIOS
const getAll = async() => {
    return await db.Loan.findAll();
}

const getById = async(id) => {
    return await db.Loan.findByPk(id);
}

const getByUserId = async(userId) => {
    return await db.Loan.find({ userId: userId });
}

const getByBookId = async(bookId) => {
    return await db.Loan.find({ bookId: bookId });
}

const create = async(loan) => {
    return await db.Loan.create(loan)
}

const update = async(id, loan)=> {
    return await db.Loan.update(
        {
            startDate: loan.startDate,
            dueDate: loan.dueDate
        }, {where: {id: id}}
        )
}


export const LoanRepository = {
    getAll,
    getById,
    getByUserId,
    getByBookId,
    create,
    update
}