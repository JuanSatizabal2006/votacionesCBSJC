import { db } from "../../db.js";

export const existTemporadaCandidato = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1"
    );
    
    if(rows.length == 0){
      return next();
    };
    const activa = rows[0].estado;

    if (activa != "1") {
      return res.status(400).json({
        error: "No puedes crear un candidato sin una temporada disponible",
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

//ESTUDIANTES
export const candidActiv = async (req, res, next) => {
  try {
    const { temporada } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM `temporada` WHERE idTemporada = ?",
      [temporada]
    );

    if (rows[0].estado != "2" && rows[0].estado != 4) {
      return res.status(203).json({
        error:
          "Solo puedes ingresar cuando los administradores lo permitan",
        mensaje: "Listado fallido",
      });
    }
    req.estado = rows[0].estado;
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Busqueda fallida",
    });
  }
};
