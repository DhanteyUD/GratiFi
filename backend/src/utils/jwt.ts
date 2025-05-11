import jwt from "jsonwebtoken";
import { configKeys } from "@/config";

const jwtSecret = configKeys.jwtSecret;

export const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: "1d",
    }
  );
};
