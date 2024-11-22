import { db } from "../../db.js";

export const documentValid = async (req, res, next) => {
  try {
    if (!req.body.documento) {
      throw new Error("Documento obligatorio");
    }

    const { documento } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM `usuarios` WHERE documento = ?",
      [documento]
    );

    if (rows.length > 0) {
      throw new Error("¡Documento ya existe!");
    }

    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "¡FALLIDO!",
    });
  }
};
