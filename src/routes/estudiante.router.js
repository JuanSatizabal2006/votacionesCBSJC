import { Router } from "express";
import { validIdTemporada } from "../middlewares/datos/candidatos.middleware.js";
import { candidActiv } from "../middlewares/consultas/candidatos.middleware.js";
import { listarCandidatos } from "../controllers/estudiante/candidatos.js";
import { validLoginEstud } from "../middlewares/datos/auth.middleware.js";
import { loginEstud } from "../controllers/estudiante/auth.js";

const routerS = Router();

routerS.get(
  "/estudiante/candidato/listar",
  validIdTemporada,
  candidActiv,
  listarCandidatos
);

//LOGIN
routerS.post("/estudiante/login",validLoginEstud, loginEstud);

export default routerS