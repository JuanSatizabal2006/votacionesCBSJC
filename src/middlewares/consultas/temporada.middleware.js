import { db } from "../../db.js";

export const existTemporada = async (req, res, next) => {
  try {
    const query = await db.query(
      "SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1"
    );
    const activa = query[0][0].activa;
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
      error: error,
      mensaje: "Creacion de temporada cancelada",
    });
  }
};
