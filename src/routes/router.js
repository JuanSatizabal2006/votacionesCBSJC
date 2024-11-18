import { Router } from "express";
import { prueba } from "../controllers/prueba.js";
import { createTemporada } from "../controllers/admin/temporada.js";
import { existeTemporada, validarDatosTemporada } from "../middlewares/temporada.js";
import upload from "../helpers/multerConfig.js";
import { crearCandidatos } from "../controllers/admin/candidatos.js";
const router = Router()

router.get("/prueba", prueba)

//TEMPORADA
router.post("/temporada/crear", validarDatosTemporada , existeTemporada ,createTemporada);

//CANDIDATOS
router.post("/candidato/crear", upload.single('imagen'), crearCandidatos)

export default router