import { db } from "../db.js";

//El admin puede ver cualquier tipo de resultados
export const obtenerResultados = async (grado, temporada) => {
  const objResult = {
    title: "Total",
    data: [], //total votos
    categories: [], //numerales
    tooltipLabels: [], //nombres
    subtitle: grado == "11" ? "Personero" : "Personerito",
    maxValue: 0,
    users: [], //Datos fuera de la grafica
  };

  try {

    const [rows] = await db.query(
      'SELECT COUNT(a.idCandidato) as total, b.idCandidato, CONCAT(b.nombre, " ", b.apellido) as nombre, b.numeral, b.imagen, b.grado FROM `votacion` a INNER JOIN `candidato` b ON b.idCandidato = a.idCandidato INNER JOIN `temporada` c ON c.idTemporada = b.idTemporada WHERE c.idTemporada = ? AND b.grado LIKE ? GROUP BY a.idCandidato, b.idCandidato, nombre, b.numeral, b.imagen, b.grado ;',
      [temporada, `${grado}%`, temporada]
    );
    
    if (rows.length <= 0) {
      throw new Error("No hay votos registrados");
    }
    
    rows.forEach((value, index) => {
      objResult.data.push(value.total || 0);
      objResult.categories.push(value.numeral || 0);
      objResult.tooltipLabels.push(value.nombre || "");
      objResult.users.push({
        img: value.imagen,
        ficha: value.numeral,
        grado: value.grado,
        nombre: value.nombre,
      });
      //Asignar el maximo en base a la cantidad de estudiantes activos
      objResult.maxValue = objResult.maxValue + value.total
    });

    return {
      resultados: objResult,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
