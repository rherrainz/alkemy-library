import { HTTP_STATUSES } from "../constants/http.js";
import { authentication } from "../services/authentication.service.js";
import ApiError from "../errors/api.error.js";
import { info } from "../log/logger.log.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authentication(email, password);
    res.status(HTTP_STATUSES.OK).json({ token });
    info(email, "Inicio de sesión exitoso.");
  } catch (error) {
    next(error);
  }
};

export const authenticationController = {
  login,
};
