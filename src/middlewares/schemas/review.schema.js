import Joi from "joi";
import { Schemas } from "./index.schema.js";

export const schemaReview = {
  create: Joi.object().keys({
    reviewText: Schemas.String,
    rating: Schemas.Rating,
    bookId: Schemas.Id,
  }),
  update: Joi.object().keys({
    reviewText: Schemas.StringUpdate,
    rating: Schemas.RatingUpdate,
    bookId: Schemas.IdUpdate,
  }),
};
