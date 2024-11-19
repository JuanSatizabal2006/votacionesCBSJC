import { db } from "../../db.js";

export const existTemporadaCandidato = async (req, res, next) => {
  try {
    const query = await db.query(
      "SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1"
    );
    const activa = query[0][0].activa;

    if (activa == "0") {
      return res.status(400).json({
        error: "No puedes crear un candidato sin una temporada activa",
        mensaje: "Creacion de candidato cancelada",
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Creacion de candidato fallida",
    });
  }
};

export const candidActiv = async (req, res, next) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM `temporada` WHERE idTemporada = ?",
      [idTemporada]
    );

    if (rows[0].activa != "1") {
      return res.status(203).json({
        error:
          "Solo puedes ver el listado de candidatos cuando los administradores lo permitan",
        mensaje: "Listado fallido",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Busqueda fallida",
    });
  }
};
