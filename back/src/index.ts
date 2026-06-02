import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import server from "./server";

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("DB conectada 🚀");

    server.listen(PORT, () => {
      console.log(`Server corriendo en ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error DB:", err);
  });