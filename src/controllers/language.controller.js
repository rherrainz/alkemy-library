import { HTTP_STATUSES } from "../constants/http.js";
import { LanguageService } from "../services/language.service.js";
import ApiError from "../errors/api.error.js";


const getAll = async (req, res, next) => {
    try {
        const result = await LanguageService.getAll();
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};


const add = async (req, res, next) => {
    try {
        const result = await LanguageService.create(req.body);
        res.status(200).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
}

export const LanguageController = {
    getAll,
    add,
}