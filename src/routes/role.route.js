import express from "express";
import { RoleController } from "../controllers/role.controller.js";

const router = express.Router();

router.post('/', RoleController.create);

export default router;
