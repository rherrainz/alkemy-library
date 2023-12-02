import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service.js';

export const authentication = async (email, password) => {
    try {
        const result = await UserService.findUserByEmailAndPassword(email, password);
        if (!result) throw new Error("Credenciales incorrectas");
        // if (!result.isActive) throw new Error("Confirmá tu cuenta par seguir :O 🎤");
        const token = jwt.sign(result, process.env.JWT_SECRETKEY, /*{ expiresIn: "1h" }*/);
        return token;
    } catch (error) {
        throw error
    }
}