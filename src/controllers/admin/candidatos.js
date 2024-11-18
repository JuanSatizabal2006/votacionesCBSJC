import { db } from "../../db.js"

export const crearCandidatos = async (req, res) =>{
    try {
        console.log(req.file);
        console.log(req.file);
        
        const nameImg = `http://localhost:3000/static/uploads/${req.file.originalname}`

        console.log(nameImg);
        
        
        //const query = db.query("INSERT INTO `candidato`(`nombre`, `grado`, `numeral`, `imagen`, `idTemporada`) VALUES ([value-2]','[value-3]','[value-4]','[value-5]','[value-6]')")
        res.send('UWU')
    } catch (error) {
        res.json({
            error: error,
            mensaje : "Creacion de candidato fallida"
        })
    }
}