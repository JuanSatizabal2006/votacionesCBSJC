export const validCont = (req, res, next) => {
  const regex = /^(?=.*\d).{8,}$/;

  try {
    if (!req.body.contrasena) {
      throw new Error("Contrasena obligatoria");
    }
    const contra = req.body.contrasena;

    if (!regex.test(contra)) {
      throw new Error("Como minimo 8 letras y 1 numero");
    }
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "¡FALLIDO!",
    });
  }
};
