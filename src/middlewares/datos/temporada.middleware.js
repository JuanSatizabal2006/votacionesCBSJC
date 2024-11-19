export const validDataTemporada = async (req, res, next) => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  try {
    //Validar si se ingreso la fecha
    if (!req.body.fecha) {
      return res.status(400).json({
        error: { fecha: "La fecha es obligatoria" },
        mensaje: "Creacion de temporada cancelada",
      });
    }

    const { fecha } = req.body;

    //Validar el formato de la fecha
    if (!regex.test(fecha)) {
      return res.status(400).json({
        error: "El formato de la fecha es incorrecto",
        mensaje: "Creacion de temporada cancelada",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      error : error.message,
      mensaje: 'Creacion de temporada cancelada'
    });
  }
};
