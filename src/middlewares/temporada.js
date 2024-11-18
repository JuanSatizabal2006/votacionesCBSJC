import { db } from "../db.js";

export const validarDatosTemporada = async (req, res, next) => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  try {
    //Validar si se ingreso la fecha
    if (!req.body.fecha) {
      return res.status(400).json({
        error: { fecha: "La fecha es obligatoria" },
        mensaje: "Creacion de temporada cancelada",
      });
    }

    const { fecha } = req.body;

    //Validar el formato de la fecha
    if (!regex.test(fecha)) {
      return res.status(400).json({
        error: "El formato de la fecha es incorrecto",
        mensaje: "Creacion de temporada cancelada",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({});
  }
};

export const existeTemporada = async (req, res, next) => {
  try {
    const query = await db.query(
      "SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1"
    );
    const activa = query[0][0].activa;
    //Validamos si es null, si lo es, entonces actualmente se encuentra una temporada iniciada
    if (activa == "1") {
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
