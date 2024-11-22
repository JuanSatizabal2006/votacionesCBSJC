import { db } from "../../db.js";
import { URL_IMG } from "../../config.js";

export const crearCandidatos = async (req, res) => {
  try {
    console.log(req.body);

    const nameImg = `${URL_IMG}${req.file.originalname}`;
    const { nombre, apellido, grado, numeral, idTemporada } = req.body;

    const query = await db.query(
      "INSERT INTO `candidato`(`nombre`,`apellido`,`grado`, `numeral`, `imagen`, `idTemporada`) VALUES (?,?,?,?,?,?)",
      [nombre, apellido, grado, numeral, nameImg, idTemporada]
    );

    res.status(201).json({
      data: {
        id: query[0].insertId,
        a : req.body
      },
      mensaje: "¡Candidato creado con exito!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Creacion de candidato fallida",
    });
  }
};

export const listCandidAdmin = async (req, res) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM `candidato` WHERE idTemporada = ?",
      [idTemporada]
    );

    if(rows.length == 0){
        return res.status(404).json({
            error: 'No hay candidatos creados',
            message : 'Listado de candidatos fallida'
        });
    }

    res.status(200).json({
        data: rows,
        mensaje: '¡Listado de candidatos con exito!'
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Listado de candidatos fallida",
    });
  }
};
