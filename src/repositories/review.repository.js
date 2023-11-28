/*TODO: IMPORTACIÓN DE INDEX.DB */
import { db } from "./../db/index.db.js"


//ACCIÓN CON PRIVILEGIOS
const getAll = async() => {
    return await db.Review.findAll();
}

const getById = async(id) => {
    return await db.Review.findByPk(id);
}

const getByUserId = async(userId) => {
    return await db.Review.find({ userId: userId});
}

const getByBookId = async(bookId) => {
    return await db.Review.find({ bookId: bookId});
}

const create = async(review) => {
    return await db.Review.create(review)
}

const update = async(id, review)=> {
    return await db.Review.update(
        {
            reviewText: review.reviewText,
            rating: review.rating
        }, {where: {id: id}}
        )
}

export const ReviewRepository = {
    getAll,
    getById,
    getByUserId,
    getByBookId,
    create,
    update,
}