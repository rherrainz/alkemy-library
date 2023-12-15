import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service.js";
import ApiError from "../errors/api.error.js";
import { info } from "../log/logger.log.js";


const authentication = async (email, password) => {
  try {
    const result = await UserService.findUserByEmailAndPassword(
      email,
      password,
    );

    if (!result) throw new ApiError("Invalid credentials", 401);;

    if (!result.isActive) throw new ApiError("Confirmá tu cuenta para seguir", 401);
    const token = jwt.sign(
      result,
      process.env.JWT_SECRETKEY /*{ expiresIn: "1h" }*/,
    );

    //ACTUALIZAR LOG
    info(email, "Inicio de sesión exitoso.");

    return token;
  } catch (error) {
    throw error;
  }
};

export const AuthenticationService = {
  authentication
}
