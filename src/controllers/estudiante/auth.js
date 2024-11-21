import { db } from "../../db.js";

export const loginEstud = async (req, res) => {
  try {
    const { documento } = req.body;

    const [dataEstud] = await db.query(
      "SELECT * FROM `usuarios` WHERE isActive = 1 AND idRol = 2 AND documento = ?",
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

    const estado = estadoTemp[0].estado
    console.log(estado);

    if (estado != 2 && estado != 4) {
      throw new Error(
        "No puedes acceder en este momento, intenta de nuevo más tarde"
      );
    }

    res.status(202).json({
      mensaje: "Acceso valido",
      data: dataEstud[0],
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
      mensaje: "Acceso denegado",
    });
  }
};
