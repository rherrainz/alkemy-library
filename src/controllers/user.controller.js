import { HTTP_STATUSES } from "../constants/http.js";
import { UserService } from "../services/user.service.js";

const getAll = async(req, res, next) => {
    try {
        const result = await UserService.getAll();
        res.status(HTTP_STATUSES.OK).json({ data: result});
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await UserService.getById(req.params.id);
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(error);
    }
};

export const UserController = {
    getAll,
    getById,
}