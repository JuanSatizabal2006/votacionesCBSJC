import { db } from "../../db.js";
import { estadoUltimaTemporada } from "../../helpers/querys/ultimaTemporada.js";
import { obtenerResultados } from "../../helpers/resultados.js";

//El admin puede ver cualquier tipo de resultados
export const verResultados = async (req, res) => {
  //"/admin/resultado/:temporada/:grado"
  try {
    if (!req.params.temporada) {
      throw new Error("El id de la temporada es obligatorio");
    }
    if (!req.params.grado) {
      throw new Error("El grado es obligatorio");
    }

    const { temporada, grado } = req.params;
    const resultados = await obtenerResultados(grado, temporada); //Obtencion de los datos para la grafica

    if (resultados.error) {
      throw new Error(resultados.error);
    }

    res.status(200).json({
      data: resultados.resultados,
      mensaje: "Resultados calculados exitosamente",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      mensaje: "Error al mostrar los resultados",
    });
  }
};

export const verGanador = async (req, res) => {
  try {
    if (!req.params.temporada) {
      throw new Error("El id de la temporada es obligatorio");
    }
    if (!req.params.grado) {
      throw new Error("El grado es obligatorio");
    }

    const estadTemp = await estadoUltimaTemporada();
    if (estadTemp.error) {
      throw new Error(estadTemp.error);
    }

    const { temporada, grado } = req.params;
    const resultados = await obtenerResultados(grado, temporada); //Obtencion de los datos para la grafica

    if (resultados.error) {
      throw new Error(resultados.error);
    }

    const [rows] = await db.query(
      "SELECT COUNT(*) as total, a.idCandidato, CONCAT(b.nombre, ' ', b.apellido) as nombre, b.imagen, b.grado, b.slogan FROM `votacion` a INNER JOIN `candidato` b ON b.idCandidato = a.idCandidato WHERE b.grado LIKE ? AND b.idTemporada = ? GROUP BY a.idCandidato, nombre, b.imagen, b.grado, b.slogan ORDER BY total DESC",
      [`${grado}%`, temporada]
    );

    res.status(200).json({
      data: {
        ganador: rows[0],
        dataGraphic: resultados.resultados,
      },
      mensaje: "¡Ganador obtenido correctamente!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      mensaje: "Error al mostrar los resultados",
    });
  }
};
