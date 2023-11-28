import { BookService } from "../services/book.service.js";

const getAll = (req, res, next) => {
    BookService.getAll()
        .then((result) => {
            res.status(200).json({data: result})
        })
}