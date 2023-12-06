import { HTTP_STATUSES } from "../constants/http.js";
import { schemaLoan } from "./schemas/loan.schema.js";

//VALIDACIONES DE SCHEMAS
const validateCreate = (req, res, next) => {
  const { error } = schemaLoan.create.validate(req.body, {
    abortEarly: false,
  });
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
  const { error } = schemaLoan.update.validate(req.body, {
    abortEarly: false,
  });
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

export const LoanMiddleware = {
  validateCreate,
  validateUpdate,
};
