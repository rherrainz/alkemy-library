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
    return await db.Review.findAll({where: { userId: userId}});
}

const getByBookId = async(bookId) => {
    return await db.Review.findAll({where: {bookId: bookId}});
}

const create = async(review, user) => {
    const book = await db.Book.findByPk(review.bookId);
    if (!book) throw new ApiError('Book id not found', HTTP_STATUSES.BAD_REQUEST);
    review.userId = user.id

    const reviewCreated = await db.Review.create(review);
    const reviews = await getByBookId(book.id)
    
    let totalRating = 0
    reviews.forEach(element => {
        totalRating += +element.dataValues.rating
    });
    const avg = totalRating / reviews.length
    const updateAvgScore = await db.Book.update(
            { avgScore: avg },
            { where: { id: book.id }}
        )
    return reviewCreated;
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