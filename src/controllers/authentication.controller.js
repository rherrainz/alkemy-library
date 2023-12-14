import { HTTP_STATUSES } from "../constants/http.js";

const login = async (req, res, next, authService) => {
  try {
    const { email, password } = req.body;
    const token = await authService(email, password);
    res.status(HTTP_STATUSES.OK).json({ token });
  } catch (error) {
    next(error);
  }
};

export const authenticationController = {
  login,
};
