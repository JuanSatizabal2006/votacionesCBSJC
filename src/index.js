import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import morgan from "morgan";
import sharp from "sharp";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();

app.use(express.static('./public'));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

app.listen(3000);

console.log("Puerto escuchado en el puerto 3000");
