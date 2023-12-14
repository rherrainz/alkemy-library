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
    res.status(HTTP_STATUSES.OK).json({ data: result });
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
    const result = await genreService(req.body);
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const exportToCSV = async (req, res, next) => {
  try {
    const result = await GenreService.exportToCSV();
    res
      .status(HTTP_STATUSES.OK)
      .json({ msg: "CSV file exported successfully", result });
  } catch (error) {
    next(error);
  }
};

const downloadCSV = async (req, res, next) => {
  try {
    const { filename } = req.params;
    res.download(`src/exports/${filename}`, (err) => {
      if (err) {
        throw new ApiError(
          "File has expired",
          HTTP_STATUSES.INTERNAL_SERVER_ERROR
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

export const GenreController = {
  getAll,
  getById,
  add,
  remove,
  exportToCSV,
  downloadCSV,
};
