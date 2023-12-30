import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = "SECRET_PRIVATE_KEY";

export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateJWTToken = async (user) => {
  const token = jwt.sign({ userId: user.id, email: user.email }, PRIVATE_KEY, {
    expiresIn: "1h",
  });
  return {
    userId: user.id,
    token,
    expiresIn: 1,
  };
};

export const decryptJWTToken = (token) => {
  return jwt.verify(token, PRIVATE_KEY);
};

export const isAuthorized = (req) => {
  if (req.isAuth) {
  } else {
    throw new Error("Unauthorized!");
  }
};
