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

const create = async (req, res, next) => {
    try {
      const result = await EventService.create(req.body);
      res.status(HTTP_STATUSES.CREATED).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const result = await EventService.update(req.params.id, req.body);
      res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const result = await EventService.remove(req.params.id);
      res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };

export const EventController = {
  getAll,
  create,
  update,
  remove
};
