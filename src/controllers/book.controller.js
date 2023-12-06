import { HTTP_STATUSES } from "../constants/http.js";
import { BookService } from "../services/book.service.js";
import ApiError from "../errors/api.error.js";

const getAll = async (req, res, next) => {
  try {
    const result = await BookService.getAll();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const getAllActive = async (req, res, next) => {
  try {
    const result = await BookService.getAllActive();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const getOnlyLoan = async (req, res, next) => {
  try {
    const result = await BookService.getOnlyLoan();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await BookService.getById(req.params.id);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const getByAuthorId = async (req, res, next) => {
  try {
    const result = await BookService.getByAuthorId(req.params.id);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const getByGenreId = async (req, res, next) => {
  try {
    const result = await BookService.getByGenreId(req.params.id);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const getByAuthorOrTitle = async (req, res, next) => {
  try {
    const { author, title } = req.query;
    const result = await BookService.getByAuthorOrTitle(author, title);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const create = async (req, res, next) => {
  try {
    const { authorId, genreId, languageId } = req.body;
    const result = await BookService.create(req.body, {
      authorId,
      genreId,
      languageId,
    });
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const update = async (req, res, next) => {
  try {
    const result = await BookService.update(req.params.id, req.body);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await BookService.remove(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

export const BookController = {
  getAll,
  getAllActive,
  getOnlyLoan,
  getById,
  getByAuthorId,
  getByGenreId,
  getByAuthorOrTitle,
  remove,
  create,
  update,
};
