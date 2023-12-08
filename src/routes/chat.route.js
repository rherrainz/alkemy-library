import express from "express";
import { ChatController } from "../controllers/chat.controller.js";
import { isAuthenticated } from "../middlewares/authorization.middleware.js";

const router = express.Router();

// El middleware esta comentado para poder acceder a la ruta desde el navegador
// TODO: Eliminar el comentario en el middleware
router.get("/", /* isAuthenticated, */ ChatController.chat);

export default router;
