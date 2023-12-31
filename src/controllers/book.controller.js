import { HTTP_STATUSES } from "../constants/http.js";
import { BookService } from "../services/book.service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await BookService.getAll();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getAllActive = async (req, res, next) => {
  try {
    const result = await BookService.getAllActive();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getByParams = async (req, res, next) => {
  try {
    const { authorName, bookTitle, genreName, page } = req.query;
    const result = await BookService.getByParams(
      authorName,
      bookTitle,
      genreName,
      +page
    );
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getOnlyLoan = async (req, res, next) => {
  try {
    const result = await BookService.getOnlyLoan();
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await BookService.getById(req.params.id);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getByAuthorId = async (req, res, next) => {
  try {
    const result = await BookService.getByAuthorId(req.params.id);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getByGenreId = async (req, res, next) => {
  try {
    const result = await BookService.getByGenreId(req.params.id);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getByAuthorOrTitle = async (req, res, next) => {
  try {
    const { author, title } = req.query;
    const result = await BookService.getByAuthorOrTitle(author, title);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next, bookService) => {
  try {
    const { authorId, genreId, languageId } = req.body;
    const result = await bookService(req.body, {
      authorId,
      genreId,
      languageId,
    });
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await BookService.update(req.params.id, req.body);
    res.status(HTTP_STATUSES.ACCEPTED).json({ msg: "Book updated successfully" });
  } catch (error) {
    next(error);
  }
};

const returnBook = async (req, res, next, io) => {
  try {
    const result = await BookService.returnBook(req.params.id, io);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await BookService.remove(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ msg: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getByLastGenre = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await BookService.getByLastGenre(userId);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getByLastAuthor = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await BookService.getByLastAuthor(userId);
    res.status(HTTP_STATUSES.ACCEPTED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const exportToCSV = async (req, res, next) => {
  try {
    const result = await BookService.exportToCSV();
    res
      .status(HTTP_STATUSES.OK)
      .json({ msg: "CSV file exported successfully", result });
  } catch (error) {
    next(error);
  }
};

const downloadCSV = async (req, res, next) => {
  try {
    const { filename } = req.params;
    res.download(`src/exports/${filename}`, (err) => {
      if (err) {
        throw new ApiError(
          "File has expired",
          HTTP_STATUSES.INTERNAL_SERVER_ERROR
        );
      }
    });
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  getAll,
  getAllActive,
  getByParams,
  getOnlyLoan,
  getById,
  getByAuthorId,
  getByGenreId,
  getByAuthorOrTitle,
  remove,
  create,
  update,
  returnBook,
  getByLastGenre,
  getByLastAuthor,
  exportToCSV,
  downloadCSV,
};
