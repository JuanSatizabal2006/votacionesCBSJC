import { db } from "../../db.js";
import jwt from "jsonwebtoken";
import { JWT_ACCESS } from "../../config.js";

export const createTemporada = async (req, res) => {
  try {
    const { fecha, id } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM `admin` a INNER JOIN `usuarios` b ON a.idUsuario = b.idUsuario WHERE a.idAdmin = ?",
      [id]
    );

    if (rows.length <= 0) {
      throw new Error("Es necesario las crendenciales de un administrador");
    }

    const data = await db.query(
      "INSERT INTO `temporada` (`fecha`) VALUES (?)",
      [fecha]
    );

    const newToken = jwt.sign(
      {
        idAdmin: rows[0].idEstudiante,
        idUsuario: rows[0].idUsuario,
        nombre: rows[0].nombre,
        apellido: rows[0].apellido,
        idRol: rows[0].idRol,
        idTemporada: data[0].insertId,
        estado: 1
      },
      JWT_ACCESS,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      data: newToken,
      mensaje: "¡Temporada creada exitosamente!",
    });
  } catch (error) {
    res.json({
      error: error.message,
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
      error: error.message,
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
      error: error.message,
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
      error: error.message,
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
      error: error.message,
      mensaje: "Fin de temporada fallida",
    });
  }
};
