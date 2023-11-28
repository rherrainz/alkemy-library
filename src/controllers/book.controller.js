import { BookService } from "../services/book.service.js";

const getById = async (req, res, next) => {
    try {
        const result = await BookService.getById(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const result = await BookService.remove(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
}

export const BookController = {
    getById,
    remove
}