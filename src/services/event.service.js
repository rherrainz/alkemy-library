import { EventRepository } from "../repositories/event.repository.js";
import { messages } from "../messages/messages.js";
import { transporter } from "../messages/nodemailer.js";
import generateCSV from "../utils/csv.util.js";

const getAll = async () => {
  return await EventRepository.getAll();
};

const getByUserId = async (userId) => {
  return await EventRepository.getByUserId(userId);
};

const create = async (event) => {
  const newEvent = await EventRepository.create(event);
  const message = messages.newEventMessage(newEvent);
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return newEvent;
};

const update = async (id, event) => {
  return await EventRepository.update(id, event);
};

const remove = async (id) => {
  return await EventRepository.remove(id);
};

const exportToCSV = async () => {
  const data = await EventRepository.getAll({ raw: true });
  const fileName = await generateCSV(data);
  return `/export-csv/download/${fileName}`;
};

export const EventService = {
  getAll,
  getByUserId,
  create,
  update,
  remove,
  exportToCSV,
};
