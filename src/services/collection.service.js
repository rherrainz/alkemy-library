import { CollectionRepository } from "../repositories/collection.repository.js";
import { messages } from "../messages/messages.js";
import { transporter } from "../messages/nodemailer.js";
import generateCSV from "../utils/csv.util.js";

const getAll = async () => {
  return await CollectionRepository.getAll();
};

const getByUserId = async (userId) => {
  return await CollectionRepository.getByUserId(userId);
};

const create = async (collection, bookId, user)  => {
    collection.userId = user.id;
    collection.bookId = bookId;
    const { id: userId } = user;
    //console.log('Request Body:', req.body)
  const newCollection = await CollectionRepository.create(collection, bookId);
  /*const message = messages.newCollectionMessage(newCollection);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });*/
  return newCollection;
};

const update = async (id, event) => {
  return await CollectionRepository.update(id, collection);
};

const remove = async (id) => {
  return await CollectionRepository.remove(id);
};

const exportToCSV = async () => {
  const data = await CollectionRepository.getAll({ raw: true });
  const fileName = await generateCSV(data);
  return `/export-csv/download/${fileName}`;
};

export const CollectionService = {
  getAll,
  getByUserId,
  create,
  update,
  remove,
  exportToCSV,
};
