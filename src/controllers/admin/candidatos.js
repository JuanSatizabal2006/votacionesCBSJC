import { db } from "../../db.js"
import { URL_IMG } from '../../config.js'
import { response } from "express";

export const crearCandidatos = async (req, res) =>{
    try {        
        console.log(req.body);
       
        const nameImg = `${URL_IMG}${req.file.originalname}`
        const { nombre, apellido, grado, numeral, idTemporada } = req.body;

        const query = await db.query("INSERT INTO `candidato`(`nombre`,`apellido`,`grado`, `numeral`, `imagen`, `idTemporada`) VALUES (?,?,?,?,?,?)", [nombre, apellido, grado, numeral, nameImg, idTemporada]);
        
        res.status(201).json({
            data : {
                id : query[0].insertId
            },
            mensaje: "¡Candidato creado con exito!"
        });

    } catch (error) {
        res.status(400).json({
            error: error.message,
            mensaje : "Creacion de candidato fallida"
        })
    }
}