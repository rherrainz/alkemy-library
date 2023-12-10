import { EventRepository } from "../repositories/event.repository.js";
import { messages } from "../messages/messages.js";
import { transporter } from "../messages/nodemailer.js";

const getAll = async () => {
  return await EventRepository.getAll();
};

export const EventService = {
  getAll,
  
};
