import { HTTP_STATUSES } from "../constants/http.js";
import { AuthorService } from "../services/author.service.js";
import ApiError from "../errors/api.error.js";

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
    const result = await AuthorService.getByAuthorId(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await AuthorService.create(req.body);
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await AuthorService.update(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await AuthorService.remove(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const exportToCSV = async (req, res, next) => {
  try {
    const result = await AuthorService.exportToCSV();
    res.status(200).json({ msg: "CSV file exported successfully", result });
  } catch (error) {
    next(error);
  }
};

const downloadCSV = async (req, res, next) => {
  try {
    const { filename } = req.params;
    res.download(`src/exports/${filename}`, (err) => {
      if (err) {
        throw new ApiError("File has expired", 500);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const AuthorController = {
  getAll,
  getByAuthorId,
  create,
  update,
  remove,
  exportToCSV,
  downloadCSV,
};
