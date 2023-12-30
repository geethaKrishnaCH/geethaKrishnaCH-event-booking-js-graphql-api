import User from "../../models/user.js";
import {
  encryptPassword,
  comparePassword,
  generateJWTToken,
} from "../../helpers/auth.js";

const createUser = async ({ userInput }) => {
  try {
    const { email, password } = userInput;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email is invalid!");
    }
    if (password.length < 6) {
      throw new Error("Password must be atleast 6 characters long!");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists!");
    }
    const hashedPassword = await encryptPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();
    return { ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};
const login = async ({ email, password }) => {
  // check if email exists
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  // check if password matches
  const isEqual = await comparePassword(password, user.password);
  if (!isEqual) {
    throw new Error("Invalid credentials");
  }
  // generate jwt token
  const authResponse = generateJWTToken(user);

  // send auth response
  return authResponse;
};

export default {
  login,
  createUser,
};
