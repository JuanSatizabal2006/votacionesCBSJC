import { Router } from "express";
import { prueba } from "../controllers/prueba.js";
import {
  abrirTemporada,
  cerrarTemporada,
  createTemporada,
  finTemporada,
  publicTemporada,
} from "../controllers/admin/temporada.js";

import upload from "../helpers/multerConfig.js";
import {
  crearCandidatos,
  listCandidAdmin,
} from "../controllers/admin/candidatos.js";

import { listarCandidatos } from "../controllers/estudiante/candidatos.js";
import { validDataTemporada } from "../middlewares/datos/temporada.middleware.js";
import { existTemporada } from "../middlewares/consultas/temporada.middleware.js";
import {
  candidActiv,
  existTemporadaCandidato,
} from "../middlewares/consultas/candidatos.middleware.js";
import {
  validDataCandidato,
  validIdTemporada,
} from "../middlewares/datos/candidatos.middleware.js";
import {
  validAbrirTemporada,
  validCerrarTemporada,
  validFinTemporada,
  validPublicTemporada,
} from "../middlewares/consultas/estadoTemp.middleware.js";
import { loginEstud } from "../controllers/estudiante/auth.js";
import { validLoginEstud } from "../middlewares/datos/auth.middleware.js";
const router = Router();

router.get("/prueba", prueba);

//TEMPORADA
router.post(
  "/admin/temporada/crear",
  validDataTemporada,
  existTemporada,
  createTemporada
);

//CAMBIAR ESTADOS DE LAS TEMPORADAS
router.put(
  "/admin/temporada/abrir",
  validIdTemporada,
  validAbrirTemporada,
  abrirTemporada
);
router.put(
  "/admin/temporada/cerrar",
  validIdTemporada,
  validCerrarTemporada,
  cerrarTemporada
);
router.put(
  "/admin/temporada/publicar",
  validIdTemporada,
  validPublicTemporada,
  publicTemporada
);
router.put(
  "/admin/temporada/finalizar",
  validIdTemporada,
  validFinTemporada,
  finTemporada
);

//CANDIDATOS
router.post(
  "/candidato/crear",
  upload.single("imagen"),
  existTemporadaCandidato,
  validDataCandidato,
  crearCandidatos
);

router.get(
  "/estudiante/candidato/listar",
  validIdTemporada,
  candidActiv,
  listarCandidatos
);

router.get("/admin/candidato/listar", validIdTemporada, listCandidAdmin);

//LOGIN
router.post("/estudiante/login",validLoginEstud, loginEstud);

//VOTAR

export default router;
