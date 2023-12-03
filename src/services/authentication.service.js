import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service.js';
import ApiError from '../errors/api.error.js';

export const authentication = async (email, password) => {
    
    try {
        let apiError = new ApiError("Credenciales incorrectas", 401);
        const result = await UserService.findUserByEmailAndPassword(email, password);

        if (!result) throw apiError;

        if (!result.isActive) throw new ApiError("Confirmá tu cuenta para seguir", 401);
        const token = jwt.sign(result, process.env.JWT_SECRETKEY, /*{ expiresIn: "1h" }*/);
        return token;
    } catch (error) {
        throw new ApiError(error.message)
    }
}