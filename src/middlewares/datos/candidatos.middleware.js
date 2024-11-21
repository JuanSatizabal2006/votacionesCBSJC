//Validar que a la hora de crear un candidato, que la temporada se encuentre activa
export const validDataCandidato = async (req, res, next) => {
  const errors = {};
  try {
    if (!req.file) {
      errors.imagen = "La imagen es obligatoria";
    }

    if (!req.body.nombre) {
      errors.nombre = "El nombre es obligatorio";
    }

    if (!req.body.apellido) {
      errors.apellido = "El apellido es obligatorio";
    }

    if (!req.body.numeral) {
      errors.numeral = "El numeral del candidato es obligatorio";
    }

    if (!req.body.grado) {
      errors.grado = "El grado es obligatorio";
    }

    if (!req.body.idTemporada) {
      errors.idTemporada = "El id de la temporada es obligatoria";
    }

    if (Object.keys(errors).length > 0) {
      const error = new Error("Validación fallida");
      error.detalles = errors; // Adjunta los detalles al objeto de error
      throw error;
    }

    next();
  } catch (e) {
    res.status(400).json({
      error: e.detalles,
      mensaje: e.message,
    });
  }
};

export const validIdTemporada = async (req, res, next) => {
  try {
    if (!req.body.idTemporada) {
      throw new Error("El id de la temporada es obligatorio");
    }

    if (!isNaN(req.body.idTemporada)) {
      throw new Error("El formato del id de la temporada es incorrecto");
    }

    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Busqueda fallida",
    });
  }
};
