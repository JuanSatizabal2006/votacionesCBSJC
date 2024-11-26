import { db } from "../../db.js";
import jwt from "jsonwebtoken";
import { JWT_ACCESS, URL_IMG } from "../../config.js";

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

    const [data] = await db.query(
      "INSERT INTO `temporada` (`fecha`) VALUES (?)",
      [fecha]
    );

    console.log(data.insertId);

    //CREAMOS EL VOTO EN BLANCO
    await db.query(
      "INSERT INTO `candidato` (nombre, apellido, grado, numeral, slogan, imagen, idTemporada) VALUES(?,?,?,?,?,?,?)",
      [
        "VOTO",
        "EN BLANCO",
        "11-0",
        "00",
        "VOTO EN BLANCO",
        `${URL_IMG}VOTO_EN_BLANCO.jpg`,
        data.insertId,
      ]
    );

    await db.query(
      "INSERT INTO `candidato` (nombre, apellido, grado, numeral, slogan, imagen, idTemporada) VALUES(?,?,?,?,?,?,?)",
      [
        "VOTO",
        "EN BLANCO",
        "5-0",
        "00",
        "VOTO EN BLANCO",
        `${URL_IMG}VOTO_EN_BLANCO.jpg`,
        data.insertId,
      ]
    );

    await db.query("UPDATE `estudiante` SET `voto`= '0'")

    const newToken = jwt.sign(
      {
        idAdmin: rows[0].idEstudiante,
        idUsuario: rows[0].idUsuario,
        nombre: rows[0].nombre,
        apellido: rows[0].apellido,
        idRol: rows[0].idRol,
        idTemporada: data.insertId,
        estado: 1,
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
  const grados = [11, 5];
  try {
    const { idTemporada } = req.body;

    const ganadores = await Promise.all(
      grados.map(async (value) => {
        const [rows] = await db.query(
          "SELECT COUNT(*) as total, a.idCandidato, CONCAT(b.nombre, ' ', b.apellido) as nombre, b.imagen, b.grado, b.slogan FROM `votacion` a INNER JOIN `candidato` b ON b.idCandidato = a.idCandidato WHERE b.grado LIKE ? AND b.idTemporada = ? GROUP BY a.idCandidato, nombre, b.imagen, b.grado, b.slogan ORDER BY total DESC",
          [`${value}%`, idTemporada]
        );
        return rows[0]; // Retornamos los resultados para cada grado en orden
      })
    );

    await db.query(
      "UPDATE `temporada` SET `estado` = 4, `resultadoPersonero` = ?, `resultadoPersonerito` = ? WHERE idTemporada = ?",
      [ganadores[0].idCandidato, ganadores[1].idCandidato, idTemporada]
    );

    res.status(200).json({
      data: ganadores,
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

export const listarTemporadas = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT a.resultadoPersonero, a.resultadoPersonerito, b.* FROM `temporada` a JOIN `candidato` b ON b.idCandidato = a.resultadoPersonero || b.idCandidato = a.resultadoPersonerito"
    );

    if (rows.length <= 0) {
      throw new Error("No hay temporadas registradas");
    }
    res.status(200).json({
      data: rows,
      mensaje: "¡Listado exitoso!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      mensaje: "Error al listar las temporadas",
    });
  }
};
