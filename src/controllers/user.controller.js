import { HTTP_STATUSES } from "../constants/http.js";
import { UserService } from "../services/user.service.js";
import ApiError from "../errors/api.error.js";

const getAll = async (req, res, next) => {
  try {
    const result = await UserService.getAll(req.query.page);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getByParams = async (req, res, next) => {
  try {
    const result = await UserService.getByParams(req.query);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await UserService.getById(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await UserService.create(req.body);
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    
    if(error.name === 'SequelizeUniqueConstraintError')
    {
      res.status(HTTP_STATUSES.CONFILCT).json({ error: 'El correo electrónico ya se encuentra registrado' });
    }
    next(new ApiError(error.message));
  }
};

const update = async (req, res, next) => {
  try {
    const userIdFromToken = req.user.id;
    const requestedUserId = req.params.id;

    // Check if the user is trying to update their own data
    if (userIdFromToken !== requestedUserId) {
      return next(new ApiError("Unauthorized access, you can only update your own data", 403));
    }

    const result = await UserService.update(requestedUserId, req.body);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const result = await UserService.deleteById(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

export const UserController = {
  getAll,
  getByParams,
  getById,
  create,
  update,
  deleteById,
};
