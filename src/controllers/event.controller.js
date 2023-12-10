import { HTTP_STATUSES } from "../constants/http.js";
import { EventService } from "../services/event.service.js";
import ApiError from "../errors/api.error.js";

const getAll = async (req, res, next) => {
  try {
    const result = await EventService.getAll();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export const EventController = {
  getAll,
};
