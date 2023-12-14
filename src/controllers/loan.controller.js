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
    const result = await loanService.create(
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
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await LoanService.update(req.params.id, req.params.arrayId);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
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
};
