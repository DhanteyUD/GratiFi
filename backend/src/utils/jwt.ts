import jwt from "jsonwebtoken";
import { configKeys } from "@/config";

const jwtSecret = configKeys.jwtSecret;

export const generateToken = (user: { name: string; email: string }) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: "1h",
    }
  );
};
