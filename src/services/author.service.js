import { AuthorRepository } from "../repositories/author.repository.js";
import { messages } from "../messages/messages.js";
import { transporter } from "../messages/nodemailer.js";
import generateCSV from "../utils/csv.util.js";

const getAll = async () => {
  return await AuthorRepository.getAll();
};

const getByAuthorId = async (id) => {
  return await AuthorRepository.getByAuthorId(id);
};

const create = async (author) => {
  const newAuthor = await AuthorRepository.create(author);
  const message = messages.newAuthorMessage(newAuthor);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return newAuthor;
};

const update = async (id, author) => {
  return await AuthorRepository.update(id, author);
};

const remove = async (id) => {
  return await AuthorRepository.remove(id);
};

const exportToCSV = async () => {
  const data = await AuthorRepository.getAll({ raw: true });
  const fileName = await generateCSV(data);
  return `/export-csv/download/${fileName}`;
};

export const AuthorService = {
  getAll,
  getByAuthorId,
  create,
  update,
  remove,
  exportToCSV,
};
