/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"


//ACCIÓN CON PRIVILEGIOS
const getAll = async() => {
    return await db.Loan.findAll(
        {
            include: [
                {
                    model: db.User,
                },
                {
                    model: db.Book
                }
            ]
        }
    );
}

const getById = async(id) => {
    return await db.Loan.findByPk(id,
        {
            include: [
                {
                    model: db.User,
                },
                {
                    model: db.Book
                }
            ]
        })
}

const getByUserId = async(userId) => {
    return await db.Loan.find({ userId: userId });
}

const getByBookId = async(bookId) => {
    return await db.Loan.find({ bookId: bookId });
}

const create = async(loan, arrayId) => {

    //TODO: PRIMERO SE DEBE VERIFICAR QUE EXISTA EL LIBRO Y EL USUARIO
    const book = await db.Book.findByPk(arrayId.bookId);
    const user = await db.User.findByPk(arrayId.userId);

    if(!book || !user)
    {
        throw new ApiError('Book | User not found', 404);
    }

    //TODO: SE CREA EL PRÉSTAMO
    const loanCreated = await db.Loan.create(loan);

    return loanCreated
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