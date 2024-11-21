export const validLoginEstud = (req, res, next) => {
  try {
    if (!req.body.documento) {
      throw new Error("El documento es obligatorio");
    }
    next();
  } catch (error) {
    res.status(401).json({
      error: error.message,
      mensaje: "Acceso denegado",
    });
  }
};
