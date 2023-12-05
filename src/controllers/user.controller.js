import { HTTP_STATUSES } from "../constants/http.js";
import { UserService } from "../services/user.service.js";
import ApiError from "../errors/api.error.js";
import { transporter } from "../messages/nodemailer.js";

const getAll = async (req, res, next) => {
  try {
    const result = await UserService.getAll(req.query.page);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const getByParams = async (req, res, next) => {
  try {
    const result = await UserService.getByParams(req.query)
    res.status(HTTP_STATUSES.OK).json({ data: result})
  } catch (error) {
    next(new ApiError(error.message))
  }
}

const getById = async (req, res, next) => {
  try {
    const result = await UserService.getById(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const create = async (req, res, next) => {
  try {
    const result = await UserService.create(req.body);
    const mailOptions = {
      from: "Alkemy Library",
      to: result.email,
      subject: "Welcome to Alkemy Library",
      html: `<h1>Welcome ${result.firstName} ${result.lastName}!</h1>
      <p>You have been registered successfully!</p>
      <p>Your registered email is: ${result.email}</p>
      <p>Enjoy our library!</p>`
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    })
    res.status(HTTP_STATUSES.CREATED).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

const deleteById = async (req, res, next) => {
  try {
    const result = await UserService.deleteById(req.params.id);
    res.status(HTTP_STATUSES.OK).json({ data: result });
  } catch (error) {
    next(new ApiError(error.message));
  }
};

export const UserController = {
  getAll,
  getByParams,
  getById,
  create,
  deleteById,
};
