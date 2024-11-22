import express from "express";
import routerS from "./routes/estudiante.router.js";
import routerA from "./routes/admin.router.js";
import cors from "cors";
import morgan from "morgan";
import sharp from "sharp";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.use(cors());
app.use(morgan("dev"));

app.use(routerA);//ADMIN
app.use(routerS);//ESTUDIANTES

app.post("/prueba", async (req, res)=>{
    console.log(req.body);
    
    res.json({
        mensaje: 'Esto llega manco (3-0)',
        data: req.body
    })
})

app.listen(3000);

console.log("Puerto escuchado en el puerto 3000");
