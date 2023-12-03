import { HTTP_STATUSES } from "../constants/http.js";
import { UserService } from "../services/user.service.js";
import ApiError from "../errors/api.error.js";

const getAll = async (req, res, next) => {
    try {
        const result = await UserService.getAll();
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await UserService.getById(req.params.id);
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};

const create = async (req, res, next) => {
    try {
        const result = await UserService.create(req.body)
        res.status(HTTP_STATUSES.CREATED).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

export const UserController = {
    getAll,
    getById,
    create
}