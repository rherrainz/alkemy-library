import JWT from "jsonwebtoken";
import 'dotenv/config'

const SIGNATURE = process.env.JWT_SECRETKEY;

export const encode = async (payload) => {
  const token = JWT.sign(payload, SIGNATURE /* , { expiresIn: "1h" } */);
  return token;
};

export const decode = async (bearerToken) => {
  const token = bearerToken.split(" ")[1];
  const decoded = JWT.verify(token, SIGNATURE);
  return decoded;
};
