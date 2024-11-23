import { db } from "../../db.js";

export const votarCandidato = async (req, res) => {
  try {
    const { idEstudiante, idCandidato, hora } = req.body;
    
    const idTemporada = req.idTemporada;

    const query = await db.query(
      "INSERT INTO `votacion` (`idEstudiante`, `idCandidato`, `hora`) VALUES (?,?,?)",
      [idEstudiante, idCandidato, hora]
    );

    await db.query("UPDATE `estudiante` SET voto = 1 WHERE idEstudiante = ?", [
      idEstudiante,
    ]);

    res.status(200).json({
      data: query[0].insertId,
      mensaje:
        "¡Votacion realizada con exito!, ya puedes abandonar esta ventana.",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Error al votar",
    });
  }
};
