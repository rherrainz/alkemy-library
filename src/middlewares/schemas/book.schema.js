import Joi from "joi";
import { Schemas } from "./index.schema.js";

export const schemaBook = {
  create: Joi.object().keys({
    title: Schemas.String,
    ISBN: Schemas.String,
    edition: Schemas.String,
    year: Schemas.Year,
    numberOfPages: Schemas.NumberOfPages,
    publisher: Schemas.String,
    authorId: Schemas.ArrayId,
    genreId: Schemas.ArrayId,
    languageId: Schemas.ArrayId,
  }),
  update: Joi.object().keys({
    title: Schemas.StringUpdate,
    ISBN: Schemas.StringUpdate,
    edition: Schemas.StringUpdate,
    year: Schemas.YearUpdate,
    numberOfPages: Schemas.NumberOfPagesUpdate,
    publisher: Schemas.StringUpdate,
    authorId: Schemas.ArrayIdUpdate,
    genreId: Schemas.ArrayIdUpdate,
    languageId: Schemas.ArrayIdUpdate,
  }),
};
