import { db } from "../../db.js";

export const estadoUltimaTemporada = async () => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1"
    );

    if (rows.length == 0) {
      return {
        error: "No existen temporadas",
      };
    }

    return {
      estado: rows[0].estado,
      id: rows[0].idTemporada
    };

  } catch (error) {
    return {
      error: error.message,
    };
  }
};