import { HTTP_STATUSES } from "../constants/http.js";
import { AuthorService } from "../services/author.service.js";

const getAll = async (req, res, next) => {
    try {
        const result = await AuthorService.getAll();
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(error);
    }
};

const getByAuthorId = async (req, res, next) => {
    try {
        const result = await AuthorService.getByAuthorId(req.params.authorId);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await AuthorService.update(req.params.authorId);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await AuthorService.remove(req.params.authorId);
        res.status(200).json({ data: result });
    } catch (error) {
        next(error);
    }
};

export const AuthorController = {
    getAll,
    getByAuthorId,
    update,
    remove
}