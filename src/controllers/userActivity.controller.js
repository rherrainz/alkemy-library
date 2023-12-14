import { HTTP_STATUSES } from "../constants/http.js";
import { LoanService } from "../services/loan.service.js";
import { EventService } from "../services/event.service.js";

const getLoansByUserId = async (req, res, next) => {
  try {
    const result = await LoanService.getByUserId(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getEventsByUserId = async (req, res, next) => {
  try {
    const result = await EventService.getByUserId(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export const UserActivityController = {
  getLoansByUserId,
  getEventsByUserId,
};
