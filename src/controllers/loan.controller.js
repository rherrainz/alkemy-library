import { HTTP_STATUSES } from "../constants/http.js";
import { LoanService } from "../services/loan.service.js";
import ApiError from "../errors/api.error.js";


const getAll = async (req, res, next) => {
    try {
        const result = await LoanService.getAll();
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};

const getById = async (req, res, next) => {
    try {
        const result = await LoanService.getById(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};

const remove = async (req, res, next) => {
    try {
        const result = await LoanService.remove(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

export const BookController = {
    getAll,
    getById,
    remove
}