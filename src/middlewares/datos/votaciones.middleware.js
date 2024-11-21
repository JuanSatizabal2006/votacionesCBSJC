export const validDataVotacion = (req, res, next) => {
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

  try {
    const datos = req.body;
    if (!datos.idEstudiante || !datos.idCandidato || !datos.hora) {
      throw new Error("Todos los datos son obligatorios");
    }

    if (!regex.test(datos.hora)) {
      throw new Error("El formato de la hora es incorrecto");
    }
    console.log(datos.idEstudiante);
    
    if (isNaN(datos.idEstudiante)) {
      throw new Error("El formato del id del estudiante es incorrecto");
    }

    if (isNaN(datos.idCandidato)) {
      throw new Error("El formato del id del candidato es incorrecto");
    }

    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Error al votar",
    });
  }
};
