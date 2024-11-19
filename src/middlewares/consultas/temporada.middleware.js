import { db } from "../../db.js";

export const existTemporada = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1"
    );
    if (rows.length == 0) {
      return next();
    }
    const activa = rows[0].estado;
    //Validamos si la ultima temporada creada ha sido cerrada o no
    if (activa != "0") {
      return res.status(406).json({
        mensaje: "Creacion de temporada cancelada",
        error: "Actualmente te encuentras en una temporada sin finalizar",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Creacion de temporada cancelada",
    });
  }
};
