import { db } from "../db.js";

export const validarDatosTemporada = async (req, res, next) => {
  try {
    const { fecha } = req.body;
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

    //Validar si se ingreso la fecha
    if (!fecha) {
      return res.status(400).json({
        error: "La fecha es obligatoria",
        mensaje: "Creacion de temporada cancelada",
      });
    }

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

export const existeTemporada = async (req, res, next) =>{
    try {
        const query = await db.query("SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1");
        console.log(query[0][0]);
        
        const resultado = query[0][0].resultado
        console.log(resultado);
        
        //Validamos si es null, si lo es, entonces actualmente se encuentra una temporada iniciada
        if (!resultado) {
            return res.status(406).json({
                mensaje: "Creacion de temporada cancelada",
                error : "Actualmente te encuentras en una temporada sin finalizar"
            })
        }

        next();

    } catch (error) {
        res.status(400).json({
            error : error,
            mensaje: "Creacion de temporada cancelada"
        })
    }
}