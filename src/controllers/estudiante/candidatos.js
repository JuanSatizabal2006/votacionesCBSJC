import { db } from "../../db.js";

export const listarCandidatos = async (req, res) => {
  try {
    if (!req.params.temporada) {
      throw new Error("El id de la temporada es obligatorio");
    }
    const { temporada } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM `candidato` WHERE idTemporada = ?",
      [temporada]
    );

    if (rows.length == 0) {
      return res.status(404).json({
        error: "No existen candidatos",
        mensaje: "Error al buscar los candidatos",
      });
    }

    res.status(200).json({
      data: rows,
      mensaje: "¡Candidatos listados con exito!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Error al buscar los candidatos",
    });
  }
};
