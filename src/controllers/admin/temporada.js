import { db } from "../../db.js";

export const createTemporada = async (req, res) => {
  try {
    const { fecha } = req.body;
    console.log(fecha);

    const data = await db.query(
      "INSERT INTO `temporada` (`fecha`) VALUES (?)",
      [fecha]
    );

    res.status(201).json({
      data: {
        idTemporada: data[0].insertId, //ESTE ID SE DEBE ACTUALIZAR EN EL FRONTEND
      },
      mensaje: "¡Temporada creada exitosamente!",
    });
  } catch (error) {
    res.json({
      error: error,
      mensaje: "Creacion de temporada fallida",
    });
  }
};

export const abrirTemporada = async (req, res) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "UPDATE `temporada` SET `estado` = 2 WHERE idTemporada = ?",
      [idTemporada]
    );

    res.status(200).json({
      data: rows,
      mensaje: "¡Votaciones abiertas con exito!",
    });
  } catch (error) {
    res.json({
      error: error,
      mensaje: "Apertura de temporada fallida",
    });
  }
};

export const cerrarTemporada = async (req, res) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "UPDATE `temporada` SET `estado` = 3 WHERE idTemporada = ?",
      [idTemporada]
    );

    res.status(200).json({
      data: rows,
      mensaje: "¡Votaciones cerradas con exito!",
    });
  } catch (error) {
    res.json({
      error: error,
      mensaje: "Cierre de temporada fallida",
    });
  }
};

export const publicTemporada = async (req, res) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "UPDATE `temporada` SET `estado` = 4 WHERE idTemporada = ?",
      [idTemporada]
    );

    res.status(200).json({
      data: rows,
      mensaje: "¡Votaciones publicadas con exito!",
    });
  } catch (error) {
    res.json({
      error: error,
      mensaje: "Publicacion de temporada fallida",
    });
  }
};

export const finTemporada = async (req, res) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "UPDATE `temporada` SET `estado` = 0 WHERE idTemporada = ?",
      [idTemporada]
    );

    res.status(200).json({
      data: rows,
      mensaje: "¡Votaciones finalizadas con exito!",
    });
  } catch (error) {
    res.json({
      error: error,
      mensaje: "Fin de temporada fallida",
    });
  }
};
