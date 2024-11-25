import { db } from "../../db.js";
import { estadoUltimaTemporada } from "../../helpers/querys/ultimaTemporada.js";

export const votarCandidato = async (req, res) => {
  try {
    const { idEstudiante, idCandidato, hora } = req.body;

    const temp = await estadoUltimaTemporada();

    if (temp.error) {
      throw new Error(temp.error);
    }

    if (temp.estado != 2) {
      throw new Error(
        "Las votaciones ya han sido cerradas, no puedes votar en este momento"
      );
    }

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
