import { db } from "../../db.js"

export const createTemporada = async (req,res) =>{
    try {
        const { fecha } = req.body;
        const data = db.query("INSERT INTO `temporada`(`fecha`) VALUES ('$1')", [ fecha ])

        res.status(201).json({
            data: data[0],
            mensaje: "¡Temporada creada exitosamente!"
        })

    } catch (error) {
        res.json({
            error: error,
            mensaje : "Creacion de temporada fallida"
        })
    }
}