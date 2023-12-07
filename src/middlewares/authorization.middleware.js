import { decode } from "../utils/token.util.js";
import { ROLE } from "../constants/role.constants.js";
import ApiError from "../errors/api.error.js";

export const isAuthenticated = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (bearerToken === undefined || !bearerToken)
    next(new ApiError("Unauthorized acces, you did not send a token", 401));

  try {
    const { id, email, role, isActive } = await decode(bearerToken);

    //ROL DEL USUARIO DEL PAYLOAD DEL TOKEN
    if (role == ROLE.SUPADMIN || role == ROLE.ADMIN || role == ROLE.USER) {
      const user = {
        id,
        email,
        role,
        isActive,
      };

      req.user = user;

      next();
    } else {
      next(new ApiError("Token is invalid", 404));
    }
  } catch (error) {
    next(new ApiError(error.message));
  }
};

export const isAdmin = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken === undefined || !bearerToken)
    next(new ApiError("Unauthorized acces, you did not send a token", 401));

  try {
    const { id, email, role, isActive } = await decode(bearerToken);

    //ROL DEL USUARIO DEL PAYLOAD DEL TOKEN
    if (role == ROLE.ADMIN || role == ROLE.SUPADMIN) {
      const user = {
        id,
        email,
        role,
        isActive,
      };

      req.user = user;

      next();
    } else {
      next(
        new ApiError(
          "Unauthorized access. This resource is reserved for users with superadmin or admin privileges.",
          401,
        ),
      );
    }
  } catch (error) {
    next(new ApiError(error.message));
  }
};

export const isSupAdmin = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken === undefined || !bearerToken)
    next(new ApiError("Unauthorized acces, you did not send a token", 401));

  try {
    const { id, email, role, isActive } = await decode(bearerToken);

    //ROL DEL USUARIO DEL PAYLOAD DEL TOKEN
    if (role == ROLE.SUPADMIN) {
      const user = {
        id,
        email,
        role,
        isActive,
      };

      req.user = user;

      next();
    } else {
      next(
        new ApiError(
          "Unauthorized access. This resource is reserved for users with superadmin privileges.",
          401,
        ),
      );
    }
  } catch (error) {
    next(new ApiError(error.message));
  }
};
