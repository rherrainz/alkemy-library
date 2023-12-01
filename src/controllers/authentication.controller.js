import { HTTP_STATUSES } from "../constants/http.js";
import { UserService } from "../services/user.service.js";

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const token = await UserService.login(email, password)
        res.status(HTTP_STATUSES.OK).json({ token })
    } catch (error) {
        next(error)
    }
}

export const authenticationController = {
    login
}