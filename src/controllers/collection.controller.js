import { HTTP_STATUSES } from "../constants/http.js";
import { CollectionService } from "../services/collection.service.js";
import ApiError from "../errors/api.error.js";

const getAll = async (req, res, next) => {
  try {
    const result = await CollectionService.getAll();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await CollectionService.create(
        req.body,
        req.body.bookId,
        user
      );
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await CollectionService.update(req.params.id, req.body);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await CollectionService.remove(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const exportToCSV = async (req, res, next) => {
  try {
    const result = await CollectionService.exportToCSV();
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

export const CollectionController = {
  getAll,
  create,
  update,
  remove,
  exportToCSV,
  downloadCSV,
};
