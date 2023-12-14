import { EventRepository } from "../repositories/event.repository.js";
import { messages } from "../messages/messages.js";
import { transporter } from "../messages/nodemailer.js";

const getAll = async () => {
  return await EventRepository.getAll();
};

const getByUserId = async (userId) => {
    return await EventRepository.getByUserId(userId);
  };

/*const create = async (event) => {
    return await EventRepository.create(event);
  };*/

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

export const EventService = {
  getAll,
  getByUserId,
  create,
  update,
  remove
};
