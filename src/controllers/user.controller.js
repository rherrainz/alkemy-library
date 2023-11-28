import { HTTP_STATUSES } from "../constants/http.js";

export class UserController {
  async getOneUser(req, res, next) {
    try {
      const id = req.params.id;
      res.status(HTTP_STATUSES.OK).json({ UserID: id });
    } catch (error) {
      console.log(error);
    }
  }
}
