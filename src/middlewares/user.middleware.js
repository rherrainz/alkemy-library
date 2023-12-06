import { HTTP_STATUSES } from "../constants/http.js";
import { schemaUser } from "./schemas/user.schema.js";

//VALIDACIONES DE SCHEMAS
const validateCreate = (req, res, next) => {
  const { error } = schemaUser.create.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = {};
    error.details.forEach((detail) => {
      errorMessages[detail.context.key] = detail.message;
    });
    res
      .status(HTTP_STATUSES.UNPROCESSABLE_ENTITY)
      .json({ messages: errorMessages });
  } else {
    next();
  }
};

const validateLogin = (req, res, next) => {
  const { error } = schemaUser.login.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = {};
    error.details.forEach((detail) => {
      errorMessages[detail.context.key] = detail.message;
    });
    res
      .status(HTTP_STATUSES.UNPROCESSABLE_ENTITY)
      .json({ messages: errorMessages });
  } else {
    next();
  }
};

const validateUpdate = (req, res, next) => {
  const { error } = schemaUser.update.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = {};
    error.details.forEach((detail) => {
      errorMessages[detail.context.key] = detail.message;
    });
    res
      .status(HTTP_STATUSES.UNPROCESSABLE_ENTITY)
      .json({ messages: errorMessages });
  } else {
    next();
  }
};

export const UserMiddleware = {
  validateCreate,
  validateLogin,
  validateUpdate,
};
