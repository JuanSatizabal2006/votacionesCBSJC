import { Router } from "express";
import { prueba } from "../controllers/prueba.js";
import { createTemporada } from "../controllers/admin/temporada.js";

import upload from "../helpers/multerConfig.js";
import { crearCandidatos } from "../controllers/admin/candidatos.js";

import { listarCandidatos } from "../controllers/estudiante/candidatos.js";
import { validDataTemporada } from "../middlewares/datos/temporada.middleware.js";
import { existTemporada } from "../middlewares/consultas/temporada.middleware.js";
import { candidActiv, existTemporadaCandidato } from "../middlewares/consultas/candidatos.middleware.js";
import { validDataCandidato, validIdTemporada } from "../middlewares/datos/candidatos.middleware.js";
const router = Router();

router.get("/prueba", prueba);

//TEMPORADA
router.post(
  "/temporada/crear",
  validDataTemporada,
  existTemporada,
  createTemporada
);

//CANDIDATOS
router.post(
  "/candidato/crear",
  upload.single("imagen"),
  existTemporadaCandidato,
  validDataCandidato,
  crearCandidatos
);

router.get("/estudiante/candidato/listar", validIdTemporada, candidActiv, listarCandidatos);

export default router;
