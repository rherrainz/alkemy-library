import Joi from "joi";
import { Schemas } from "./index.schema.js";

export const schemaUser = {
  create: Joi.object().keys({
    firstName: Schemas.String,
    lastName: Schemas.String,
    email: Schemas.Email,
    password: Schemas.Password,
  }),
  login: Joi.object().keys({
    email: Schemas.Email,
    password: Schemas.Password,
  }),
  update: Joi.object().keys({
    firstName: Schemas.StringUpdate,
    lastName: Schemas.StringUpdate,
    email: Schemas.EmailUpdate,
    password: Schemas.PasswordUpdate,
  }),
};
