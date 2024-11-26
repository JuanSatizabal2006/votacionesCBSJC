import { Router } from "express";
import upload from "../helpers/multerConfig.js";
import { existTemporadaCandidato } from "../middlewares/consultas/candidatos.middleware.js";
import {
  validDataCandidato,
  validIdTemporada,
} from "../middlewares/datos/candidatos.middleware.js";
import {
  crearCandidatos,
  listCandidAdmin,
} from "../controllers/admin/candidatos.js";
import { validDataTemporada } from "../middlewares/datos/temporada.middleware.js";
import { existTemporada } from "../middlewares/consultas/temporada.middleware.js";
import {
  abrirTemporada,
  cerrarTemporada,
  createTemporada,
  finTemporada,
  listarTemporadas,
  publicTemporada,
} from "../controllers/admin/temporada.js";
import {
  validAbrirTemporada,
  validCerrarTemporada,
  validFinTemporada,
  validPublicTemporada,
} from "../middlewares/consultas/estadoTemp.middleware.js";
import { crearAd, pruebaBcrypt2 } from "../controllers/admin/prueba2.js";
import { documentValid } from "../middlewares/consultas/documento.middleware.js";
import { validCont } from "../helpers/regex.js";
import { verGanador, verResultados } from "../controllers/admin/resultados.js";
const routerA = Router();

//CANDIDATOS
routerA.post(
  "/admin/candidato/crear",
  upload.single("imagen"),
  existTemporadaCandidato,
  validDataCandidato,
  crearCandidatos
);

//TEMPORADA
routerA.post(
  "/admin/temporada/crear",
  validDataTemporada,
  existTemporada,
  createTemporada
);

//CAMBIAR ESTADOS DE LAS TEMPORADAS
routerA.put(
  "/admin/temporada/abrir",
  validIdTemporada,
  validAbrirTemporada,
  abrirTemporada
);
routerA.put(
  "/admin/temporada/cerrar",
  validIdTemporada,
  validCerrarTemporada,
  cerrarTemporada
);
routerA.put(
  "/admin/temporada/publicar",
  validIdTemporada,
  validPublicTemporada,
  publicTemporada
);
routerA.put(
  "/admin/temporada/finalizar",
  validIdTemporada,
  validFinTemporada,
  finTemporada
);

routerA.get("/admin/candidato/listar/:temporada", listCandidAdmin);

routerA.post("/admin/prueba", documentValid, validCont, crearAd);
routerA.post("/admin/ingresa", pruebaBcrypt2);

routerA.get("/admin/resultados/:temporada", verResultados);

routerA.get("/admin/resultados/:temporada/:grado", verResultados);//progreso
routerA.get("/admin/ganador/:temporada/:grado", verGanador)//Ganador

routerA.get("/admin/listar/temporadas", listarTemporadas);

export default routerA;
