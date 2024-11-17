import { Router } from "express";
import { prueba } from "../controllers/prueba.js";
import { createTemporada } from "../controllers/admin/temporada.js";
import { existeTemporada, validarDatosTemporada } from "../middlewares/temporada.js";
const router = Router()

router.get("/prueba", prueba)

//TEMPORADA
router.post("/temporada/crear", validarDatosTemporada , existeTemporada ,createTemporada);

export default router