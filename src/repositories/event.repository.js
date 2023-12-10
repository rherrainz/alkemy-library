/*TODO: IMPORTACIÓN DE INDEX.DB */
import ApiError from "../errors/api.error.js";
import { db } from "./../db/index.db.js";
import { Op } from "sequelize";

//ACCIÓN CON PRIVILEGIOS
const getAll = async () => {
  return await db.Event.findAll({
    include: [
      {
        model: db.User,
        through: { attributes: ["userId"] }, 
      }
    ],
  });
};

export const EventRepository = {
  getAll,
};
