import { HTTP_STATUSES } from "../constants/http.js";
import { RoleService } from "../services/role.service.js";

const create = async (req, res, next) => {
  try {
    const result = await RoleService.create(req.body);
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    res.json(error);
    // next(error)
  }
};

export const RoleController = {
  create,
};
