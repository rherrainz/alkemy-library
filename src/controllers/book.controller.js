import { HTTP_STATUSES } from "../constants/http.js";
import { BookService } from "../services/book.service.js";

const getAll = async (req, res, next) => {
    try {
        const result = await BookService.getAll();
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(error);
    }
};

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
    getAll,
    getById,
    remove
}