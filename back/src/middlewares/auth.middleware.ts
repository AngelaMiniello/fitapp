import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    // guardamos el user en el request
    (req as any).user = decoded;

    next();
  } catch (error) {
   
  console.log(error);

  return res.status(401).json({
    error: "Token inválido",
  });
  }
};