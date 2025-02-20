import { transport } from "../config/mailer.js";
import { read, write } from "../utils/fs.js";
import { signInJwt } from "../utils/jwt.js";
import { CustomError, ResData } from "../utils/response-helpers.js";
import { authenticator } from "otplib";
import dotenv from "dotenv";

dotenv.config();
let verificationCodes;

export const logincontroller = async (req, res, next) => {
  try {
    console.log(req.body, "body");
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError(400, "Email and password must be");
    }

    const findUser = read("users").find(
      (value) => value.email === email && value.password === password
    );
    if (!findUser) {
      throw new CustomError(400, "Email or password wrong");
    }

    const token = signInJwt({ id: findUser.id });
    const resData = new ResData(200, "sucsess", [{ ...findUser, token }]);
    await transport.sendMail({
      from: process.env.MAIL_NAME,
      to: findUser.email,
      subject: "Login Sucsessfull",
      text: "Siz yaxshi insonsiz",
    });

    res.status(resData.status).json(resData);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new CustomError(400, "Email must be");
    }

    const findEmail = read("users").find((value) => value.email === email);
    if (!findEmail) {
      throw new CustomError(404, "Not found email");
    }

    const token = authenticator.generate(
      process.env.SECRET_KEY + findEmail.email
    );
    verificationCodes = token;
    console.log(verificationCodes);
    await transport.sendMail({
      from: process.env.MAIL_NAME,
      to: findEmail.email,
      subject: "Verifiye Code",
      text: token,
    });

    const resData = new ResData(200, "Tasdiqlash codi jo'natildi");
    res.status(resData.status).json(resData);
  } catch (error) {
    next(error);
  }
};

export const verify = (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) {
      throw new CustomError(400, "Code must be");
    }

    if (verificationCodes !== code) {
      throw new CustomError(404, "Invalide Code");
    }

    const resData = new ResData(200, "Sucsess");
    res.status(resData.status).json(resData);
  } catch (error) {
    next(error);
  }
};

export const changePassword = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(400, "email and password must be");
    }

    const userData = read("users");
    const findEmail = userData.find((item) => item.email === email);
    if (!findEmail) {
      throw new CustomError(404, "Email not found");
    }
    const data = userData.map((value) =>
      value.email === email ? { ...value, password } : value
    );

    write("users", data);
    res.json({ message: "Parol yangilandi" });
  } catch (error) {
    next(error);
  }
};
