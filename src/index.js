import express from 'express'
import router from './routes/router.js';
import cors from 'cors'
import morgan from 'morgan';

const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

app.listen(3000)

console.log("Puerto escuchado en el puerto 3000");
