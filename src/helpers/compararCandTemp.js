import { db } from "../db.js"

export const candidTempValid = async (idTemp, idCand) =>{
    try {
        const [rows] = await db.query("SELECT * FROM candidato WHERE idTemporada = ? AND idCandidato = ?", [idTemp, idCand])
        if(rows.length == 0){
            return {
                error : "El candidato que deseas votar no pertenece a la ultima temporada"
            }
        }
        return true
    } catch (error) {
        return {
            error: error.message
        }
    }
}