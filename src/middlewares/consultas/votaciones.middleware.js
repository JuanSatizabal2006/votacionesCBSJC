import { db } from "../../db.js";
import { candidTempValid } from "../../helpers/compararCandTemp.js";
import { estadoUltimaTemporada } from "../../helpers/querys/ultimaTemporada.js";

//VALIDACION PARA SABER SI EL ESTUDIANTE PUEDE VOTAR
export const puedeVotar = async (req, res, next) => {
  try {
    const { idEstudiante, idCandidato } = req.body;

    const temporada = await estadoUltimaTemporada(); //VALIDAR SI EL ESTADO DE LA TEMPORADA ES APTO PARA VOTAR
    console.log(temporada);
    
    if (temporada.error) {
      throw new Error(temporada.error);
    }

    if (temporada.estado != 2) {
      throw new Error("No puedes votar, las votaciones no están disponibles");
    }

    //VALIDAR SI EL CANDIDATO AL CUAL DESEA VOTAR PERTENEZCA A LA ULTIMA TEMPORADA
    const candValid = await candidTempValid(temporada.id, idCandidato);

    if (candValid.error) {
      throw new Error(candValid.error);
    }

    //VALIDAR QUE EL ESTUDIANTE YA VOTÓ
    const [rows] = await db.query(
      "SELECT b.idRol, a.voto, a.grado FROM `estudiante` a INNER JOIN `usuarios` b ON b.idUsuario = a.idUsuario WHERE a.idEstudiante = ? AND b.isActive = 1",
      [idEstudiante]
    );

    if (rows.length == 0) {
      throw new Error("No puedes votar, actualmente no tienes permitido votar");
    }

    if (rows[0].idRol == 1) {
      throw new Error("Solo pueden votar los estudiantes");
    }

    if (rows[0].voto == 1) {
      throw new Error("Tu voto ya ha sido registrado");
    }

    req.idTemporada = temporada.id;

    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Error al votar",
    });
  }
};
