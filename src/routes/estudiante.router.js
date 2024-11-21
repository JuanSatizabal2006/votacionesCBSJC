import { Router } from "express";
import { validIdTemporada } from "../middlewares/datos/candidatos.middleware.js";
import { candidActiv } from "../middlewares/consultas/candidatos.middleware.js";
import { listarCandidatos } from "../controllers/estudiante/candidatos.js";
import { validLoginEstud } from "../middlewares/datos/auth.middleware.js";
import { loginEstud } from "../controllers/estudiante/auth.js";
import { votarCandidato } from "../controllers/estudiante/votaciones.js";
import { puedeVotar } from "../middlewares/consultas/votaciones.middleware.js";
import { validDataVotacion } from "../middlewares/datos/votaciones.middleware.js";

const routerS = Router();

routerS.get(
  "/estudiante/candidato/listar",
  validIdTemporada,
  candidActiv,
  listarCandidatos
);

//LOGIN
routerS.post("/estudiante/login", validLoginEstud, loginEstud);

//VOTAR
routerS.post(
  "/estudiante/votar",
  validDataVotacion,
  puedeVotar,
  votarCandidato
);

export default routerS;
