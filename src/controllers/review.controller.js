import { HTTP_STATUSES } from "../constants/http.js";
import { ReviewService } from "../services/review.service.js";
import ApiError from "../errors/api.error.js";




const getAll = async (req, res, next) => {
    try {
        const result = await ReviewService.getAll();
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(error);
    }
};


const getById = async (req, res, next) => {
    try {
        const result = await ReviewService.getById(req.params.id);
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(error);
    }
};


const getByUserId = async (req, res, next) => {
    try {
        const result = await ReviewService.getByUserId(req.params.id);
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
}


const getByBookId = async (req, res, next) => {
    try {
        const result = await ReviewService.getByBookId(req.params.id);
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
}


const create = async (req, res, next) => {
    try {
        const result = await ReviewService.create(req.body, req.user);
        res.status(HTTP_STATUSES.CREATED).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};


const update = async (req, res, next) => {
    try {
        const result = await ReviewService.update(req.params.id, req.body);
        res.status(HTTP_STATUSES.OK).json({ data: result });
    } catch (error) {
        next(new ApiError(error.message));
    }
};


export const ReviewController = {
    getAll,
    getById,
    getByUserId,
    getByBookId,
    create,
    update,
}
