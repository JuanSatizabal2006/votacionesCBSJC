import { config } from "dotenv";
config();

export const HOST = process.env.HOST
export const USER_DB = process.env.USER_DB
export const PORT = process.env.PORT
export const DATABASE = process.env.DATABASE

export const URL_IMG = process.env.URL_IMG

export const JWT_ACCESS = process.env.JWT_ACCESS