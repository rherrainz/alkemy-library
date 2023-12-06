import Joi from "joi";
import { Schemas } from "./index.schema.js";

export const schemaLoan = {
  create: Joi.object().keys({
    startDate: Schemas.Date,
    dueDate: Schemas.Date,
    bookId: Schemas.Id,
  }),
  update: Joi.object().keys({
    startDate: Schemas.DateUpdate,
    dueDate: Schemas.DateUpdate,
    bookId: Schemas.IdUpdate,
  }),
};
