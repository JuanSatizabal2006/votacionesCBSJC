import jwt from "jsonwebtoken";
import { JWT_ACCESS } from "../../config.js";

export const verificarTokenEstud = (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header) {
      throw new Error("El token de autenticación es obligatorio");
    }
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, JWT_ACCESS);

    /**
     ESTO QUEDA INCONCLUSO POR PRIORIDAD DE REQUERIMIENTOS
     */

  } catch (error) {
    res.status(401).json({
      error: error.message,
      mensaje: "Acceso denegado",
    });
  }
};
