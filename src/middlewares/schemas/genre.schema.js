import Joi from "joi";
import { Schemas } from "./index.schema.js";

export const schemaGenre = {
  create: Joi.object().keys({
    genre: Schemas.String,
  }),
  update: Joi.object().keys({
    genre: Schemas.StringUpdate,
  }),
};
