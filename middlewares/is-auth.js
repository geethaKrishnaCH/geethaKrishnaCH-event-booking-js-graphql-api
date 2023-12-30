import { decryptJWTToken } from "../helpers/auth.js";

export default function isAuth(req, res, next) {
  const bearerToken = req.get("Authorization");
  if (!bearerToken) {
    req.isAuth = false;
    return next();
  }
  const token = bearerToken.split(" ")[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }
  let decryptedJWTToken;
  try {
    decryptedJWTToken = decryptJWTToken(token);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decryptedJWTToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decryptedJWTToken.userId;
  next();
}
