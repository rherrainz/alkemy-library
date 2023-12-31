import { HTTP_STATUSES } from "../constants/http.js";
import { LoanService } from "../services/loan.service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await LoanService.getAll();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await LoanService.getById(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getByDueDate = async (req, res, next) => {
  try {
    const result = await LoanService.getByDueDate(req.params.dueDate);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next, loanService) => {
  try {
    const user = req.user;
    const { bookId } = req.body;
    const result = await loanService(
      req.body,
      user,
      bookId
    );
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await LoanService.remove(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await LoanService.update(req.params.id, req.body);
    res.status(HTTP_STATUSES.ACCEPTED).json({ msg: "Loan modified successfully" });
  } catch (error) {
    next(error);
  }
};

const exportToCSV = async (req, res, next) => {
  try {
    const result = await LoanService.exportToCSV();
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

export const LoanController = {
  getAll,
  getById,
  getByDueDate,
  create,
  edit,
  remove,
  exportToCSV,
  downloadCSV,
};
