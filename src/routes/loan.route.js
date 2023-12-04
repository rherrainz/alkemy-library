import express from "express";
import { LoanController } from "../controllers/loan.controller.js";
import { isAuthenticated, isAdmin, isSupAdmin } from "../middlewares/authorization.middleware.js";


const router = express.Router();

router.get('/', LoanController.getAll);
router.get("/:id", isAuthenticated, LoanController.getById);
router.post('/', LoanController.create);
router.patch('/edit/:id', isAuthenticated, LoanController.edit) // revisar después si la ruta es correcta + debería permitir sólo a un admin modificar

export default router;
