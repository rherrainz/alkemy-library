import Joi from "joi";
import { Schemas } from "./index.schema.js";

export const schemaLanguage = {
  create: Joi.object().keys({
    language: Schemas.String,
  }),
  update: Joi.object().keys({
    language: Schemas.StringUpdate,
  }),
};
