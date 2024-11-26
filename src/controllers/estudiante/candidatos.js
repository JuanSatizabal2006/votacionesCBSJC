import { db } from "../../db.js";
import { obtenerResultados } from "../../helpers/resultados.js";

export const listarCandidatos = async (req, res) => {
  try {
    if (!req.params.temporada) {
      throw new Error("El id de la temporada es obligatorio");
    }
    if (!req.params.grado) {
      throw new Error("El grado es obligatorio");
    }
    const { temporada, grado } = req.params;
    const estado = req.estado;

    switch (estado) {
      case "2":
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

        return res.status(200).json({
          data: rows,
          mensaje: "¡Candidatos listados con exito!",
        });

      case "4":
      
        const [ganador] = await db.query(
          "SELECT COUNT(*) as total, a.idCandidato, CONCAT(b.nombre, ' ', b.apellido) as nombre, b.imagen, b.grado, b.slogan FROM `votacion` a INNER JOIN `candidato` b ON b.idCandidato = a.idCandidato WHERE b.grado LIKE ? AND b.idTemporada = ? GROUP BY a.idCandidato, nombre, b.imagen, b.grado, b.slogan ORDER BY total DESC",
          [`${grado}%`, temporada]
        );

        if (ganador.length <= 0) {
          throw new Error("No hay un ganador definido, faltan votos");
        }

        return res.status(200).json({
          data: {
            ganador: ganador[0]
          },
          mensaje: "¡Ganador obtenido correctamente!",
        });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Error al buscar los candidatos",
    });
  }
};

/*

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

    if (rows.length <= 0) {
      throw new Error("No hay un ganador definido, faltan votos");
    }

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

*/
