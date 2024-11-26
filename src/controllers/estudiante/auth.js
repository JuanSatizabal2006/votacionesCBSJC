import { JWT_ACCESS } from "../../config.js";
import { db } from "../../db.js";
import jwt from "jsonwebtoken";

export const loginEstud = async (req, res) => {
  try {
    const { documento } = req.body;

    const [dataEstud] = await db.query(
      "SELECT * FROM `usuarios` a INNER JOIN `estudiante` b ON b.idUsuario = a.idUsuario  WHERE isActive = 1 AND idRol = 2 AND documento = ?",
      [documento]
    );

    if (dataEstud.length == 0) {
      throw new Error(
        "No puedes acceder, sigue intendando, si sigue fallando reportate con algún profesor"
      );
    }

    const [estadoTemp] = await db.query(
      "SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1"
    );

    const estado = estadoTemp[0].estado;
    //ESTUDIANTE YA VOTÓ Y LAS VOTACIONES SIGUEN EN PIE
    if (dataEstud[0].voto == 1 && estado == 2) {
      throw new Error("No puedes acceder, tu voto ya ha sido registrado");
    }

    //ESTUDIANTE NO VOTÓ PERO LAS VOTACIONES NO ESTAN DISPONIBLES PARA SU VISUALIZACION
    if (estado != 2 && estado != 4) {
      throw new Error(
        "No puedes acceder en este momento, intenta de nuevo más tarde"
      );
    }

    const accessToken = jwt.sign(
      {
        idEstudiante: dataEstud[0].idEstudiante,
        idUsuario: dataEstud[0].idUsuario,
        nombre: dataEstud[0].nombre,
        apellido: dataEstud[0].apellido,
        grado: dataEstud[0].grado,
        idRol: dataEstud[0].idRol,
        idTemporada: estadoTemp[0].idTemporada,
        estado: estado
      },
      JWT_ACCESS,
      { expiresIn: "1h" }
    );

    res.status(202).json({
      mensaje: "Acceso valido",
      data: accessToken,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
      mensaje: "Acceso denegado",
    });
  }
};
