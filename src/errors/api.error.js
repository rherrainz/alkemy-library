import { HTTP_MESSAGES, HTTP_STATUSES } from "../constants/http.js";

/**
 * Para Errores Async
 * const apiError = new ApiError("Error asincrónico", 500);
 * next(apiError);
 *
 * Para Errores Sync
 * throw new ApiError("Error síncrono", 400);
 *
 */

export default class ApiError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.message = this.setMessage(message, errorCode);
    this.errorCode = errorCode || 500;
  }

  setMessage(message, errorCode) {
    if (message) return message;

    switch (errorCode) {
      case HTTP_STATUSES.BAD_REQUEST:
        return HTTP_MESSAGES[HTTP_STATUSES.BAD_REQUEST];
      case HTTP_STATUSES.UNAUTHORIZED:
        return HTTP_MESSAGES[HTTP_STATUSES.UNAUTHORIZED];
      case HTTP_STATUSES.FORBIDDEN:
        return HTTP_MESSAGES[HTTP_STATUSES.FORBIDDEN];
      case HTTP_STATUSES.NOT_FOUND:
        return HTTP_MESSAGES[HTTP_STATUSES.NOT_FOUND];
      case HTTP_STATUSES.INTERNAL_SERVER_ERROR:
        return HTTP_MESSAGES[HTTP_STATUSES.INTERNAL_SERVER_ERROR];
      default:
        return "Untracked Error";
    }
  }
}
