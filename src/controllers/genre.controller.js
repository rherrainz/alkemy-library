import { HTTP_STATUSES } from "../constants/http.js";
import { GenreService } from "../services/genre.service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await GenreService.getAll();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await GenreService.getById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await GenreService.remove(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next, genreService) => {
  try {
    const result = await genreService.create(req.body);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export const GenreController = {
  getAll,
  getById,
  add,
  remove,
};
