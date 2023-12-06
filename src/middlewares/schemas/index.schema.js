import Joi from "joi";
import { ROLE } from "../../constants/role.constants.js";

const messageId = {
  "any.string": "The ID must be a string",
  "any.required": "The Id is required",
  "string.min": "Should have at least {#limit} characters",
  "string.max": "Exceeded the maximum of {#limit} characters",
};

const messageString = {
  "any.string": "The field must be a string",
  "any.required": "The field is required",
  "string.min": "Should have at least {#limit} characters",
  "string.max": "Exceeded the maximum of {#limit} characters",
};

const messageEmail = {
  "any.string": "The email must be a string",
  "any.required": "The email is required",
  "string.email": "The email must be valid",
  "string.min": "The email should have at least {#limit} characters",
  "string.max": "The email should have at most {#limit} characters",
};

const messagePassword = {
  "any.string": "The password must be a string",
  "any.required": "The password is required",
  "string.min": "The password should have at least {#limit} characters",
  "string.max": "The password should have at least {#limit} characters",
};

const messageRole = {
  "any.string": "The role must be a string",
  "any.required": "The role is required",
  "string.min": "You must select a valid role",
};

const messageYear = {
  "any.number": "This field is required",
  "number.integer": "The year must be an integer.",
  "number.min": "The year must be at least {#limit}.",
  "number.max": "The year must not exceed {#limit}.",
  "any.required": "The year is required",
};

const messageNumberPages = {
  "any.number": "This field is required",
  "number.integer": "The number of pages must be an integer",
  "any.required": "The number of pages is required",
  "number.min": "The number of pages should be at least {#limit}",
  "number.max": "The number of pages should be at least {#limit}",
};

const messageArray = {
  "array.base": "The field must be an array of IDs.",
  "any.required": "The field is required.",
  "string.base": "Each element in the array must be a string.",
  "string.min": "Each ID must be at least {#limit} characters long.",
  "string.max": "Each ID must not be more than {#limit} characters long.",
};

const messageDate = {
  "date.base": "Invalid date.",
  "date.format": "Date must be in yyyy-MM-dd format.",
  "date.max": "Date cannot be after the current date.",
  "any.required": "Date is required.",
};

const messageRating = {
  "number.base": "Rating must be a valid number.",
  "number.integer": "Rating must be an integer.",
  "number.min": "Rating must be at least {#limit}.",
  "number.max": "Rating must not exceed {#limit}.",
  "any.required": "Rating is required.",
};

export const Schemas = {
  //Id
  Id: Joi.string().min(35).max(36).required().messages(messageId),
  IdUpdate: Joi.string().min(35).max(36).messages(messageId),
  ArrayId: Joi.array()
    .items(Joi.string().min(35).max(36).required())
    .required()
    .messages(messageArray),
  ArrayIdUpdate: Joi.array()
    .items(Joi.string().min(35).max(36).required())
    .messages(messageArray),

  //General
  String: Joi.string().min(2).max(30).required().messages(messageString),
  StringUpdate: Joi.string().min(2).max(30).messages(messageString),
  Date: Joi.date().iso().max("now").required().messages(messageDate),
  DateUpdate: Joi.date().iso().max("now").messages(messageDate),

  //User
  Email: Joi.string().min(2).max(30).required().email().messages(messageEmail),
  EmailUpdate: Joi.string().min(2).max(30).email().messages(messageEmail),
  Password: Joi.string().min(8).max(16).required().messages(messagePassword),
  PasswordUpdate: Joi.string().min(8).max(16).messages(messagePassword),
  Role: Joi.string()
    .valid(...Object.values(ROLE))
    .required()
    .messages(messageRole),

  // Book
  Year: Joi.number()
    .integer()
    .min(1900)
    .max(2024)
    .required()
    .messages(messageYear),
  YearUpdate: Joi.number().integer().min(1900).max(2024).messages(messageYear),
  NumberOfPages: Joi.number()
    .integer()
    .min(100)
    .max(3000)
    .required()
    .messages(messageNumberPages),
  NumberOfPagesUpdate: Joi.number()
    .integer()
    .min(100)
    .max(3000)
    .messages(messageNumberPages),

  //Review
  Rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages(messageRating),
  RatingUpdate: Joi.number().integer().min(1).max(5).messages(messageRating),
  ReviewText: Joi.string().min(2).max(200).required().messages(messageString),
  ReviewTextUpdate: Joi.string().min(2).max(200).messages(messageString),
};
