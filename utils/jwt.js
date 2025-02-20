import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// import { authenticator } from "otplib";
dotenv.config();

export const signInJwt = (params) => {
  return jwt.sign(params, process.env.SECRET_KEY, {
    expiresIn: "30m",
  });
};
// const secret = "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";
// const token = authenticator.generate(secret);
// const isValid = authenticator.check(token, secret);
// console.log(isValid);
