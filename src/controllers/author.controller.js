import { HTTP_STATUSES } from "../constants/http.js";
import { AuthorService } from "../services/author.service.js";
import ApiError from "../errors/api.error.js";


const getAll = async (req, res, next) => {
    try {
        const result = await AuthorService.getAll();
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};

const getByAuthorId = async (req, res, next) => {
    try {
        const result = await AuthorService.getByAuthorId(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};

const create = async (req, res, next) => {
    try {
        const result = await AuthorService.create(req.body)
        res.status(HTTP_STATUSES.CREATED).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

const update = async (req, res, next) => {
    try {
        const result = await AuthorService.update(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await AuthorService.remove(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};

export const AuthorController = {
    getAll,
    getByAuthorId,
    create,
    update,
    remove
}