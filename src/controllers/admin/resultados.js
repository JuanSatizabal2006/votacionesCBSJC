import { db } from "../../db.js";

//El admin puede ver cualquier tipo de resultados
export const verResultados = async (req, res) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "SELECT COUNT(a.idCandidato) as total, b.idCandidato, CONCAT(b.nombre, ' ', b.apellido) as candidatoN FROM `votacion` a INNER JOIN `candidato` b ON b.idCandidato = a.idCandidato INNER JOIN `temporada` c ON c.idTemporada = b.idTemporada WHERE c.idTemporada = ? GROUP BY a.idCandidato, b.idCandidato, candidatoN",
      [idTemporada]
    );

    res.status(200).json({
      data: rows[0],
      mensaje: "Resultados calculados exitosamente",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      mensaje: "Error al mostrar los resultados",
    });
  }
};
