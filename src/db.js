import { createPool } from "mysql2/promise";
import { DATABASE, HOST, PORT, USER_DB } from "./config.js";

export const db = createPool({
  host: HOST || "localhost",
  user: USER_DB || "root",
  password: "",
  port: PORT || 3306,
  database: DATABASE || "votaciones",
});
