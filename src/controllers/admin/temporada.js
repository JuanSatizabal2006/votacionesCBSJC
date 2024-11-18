import { db } from "../../db.js"

export const createTemporada = async (req,res) =>{
    try {
        const { fecha } = req.body;
        console.log(fecha);
        
        const data = await db.query("INSERT INTO `temporada` (`fecha`) VALUES (?)", [ fecha ])

        res.status(201).json({
            data: {
                idTemporada : data[0].insertId
            },
            mensaje: "¡Temporada creada exitosamente!"
        })

    } catch (error) {
        res.json({
            error: error,
            mensaje : "Creacion de temporada fallida"
        })
    }
}