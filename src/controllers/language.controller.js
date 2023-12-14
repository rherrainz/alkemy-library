import { HTTP_STATUSES } from "../constants/http.js";
import { LanguageService } from "../services/language.service.js";
import ApiError from "../errors/api.error.js";

const getAll = async (req, res, next) => {
  try {
    const result = await LanguageService.getAll();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const result = await LanguageService.create(req.body);
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const exportToCSV = async (req, res, next) => {
  try {
    const result = await LanguageService.exportToCSV();
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

export const LanguageController = {
  getAll,
  add,
  exportToCSV,
  downloadCSV,
};
