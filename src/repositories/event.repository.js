/*TODO: IMPORTACIÓN DE INDEX.DB */
import ApiError from "../errors/api.error.js";
import { db } from "./../db/index.db.js";
import { Op } from "sequelize";

//ACCIÓN CON PRIVILEGIOS
const getAll = async (raw) => {
  return await db.Event.findAll({
    include: [
      {
        model: db.User,
        through: { attributes: [] },
      },
    ],
    raw,
  });
};

const update = async (id, event) => {
  return await db.Event.update(
    {
      eventName: event.eventName,
      date: event.date,
      location: event.location,
      description: event.description,
      maxCapacity: event.maxCapacity,
    },
    { where: { id: id } }
  );
};

const getByUserId = async (userId) => {
  return await db.Event.findAll({
    include: [
      {
        model: db.User,
        through: { attributes: ["userId"] },
        where: { id: userId },
      },
    ],
  });
};

const create = async (event) => {
  return await db.Event.create(event);
};

const remove = async (id) => {
  return db.Event.update(
    {
      isActive: false,
    },
    { where: { id: id } }
  );
};

export const EventRepository = {
  getAll,
  getByUserId,
  create,
  update,
  remove,
};
