import Joi from "joi";
import { Schemas } from "./index.schema.js";

export const schemaAuthor = {
  create: Joi.object().keys({
    firstName: Schemas.String,
    lastName: Schemas.String,
    birthDate: Schemas.Date,
    nationality: Schemas.String,
  }),
  update: Joi.object().keys({
    firstName: Schemas.StringUpdate,
    lastName: Schemas.StringUpdate,
    birthDate: Schemas.DateUpdate,
    nationality: Schemas.StringUpdate,
  }),
};
