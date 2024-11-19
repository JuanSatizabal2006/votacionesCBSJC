import { db } from "../../db.js";

export const validAbrirTemporada = async (req, res, next) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "SELECT estado FROM `temporada` WHERE idTemporada = ?",
      [idTemporada]
    );

    if (rows.length == 0) {
      throw new Error("No puedes abrir una votacion que no existe");
    }

    switch (rows[0].estado) {
      case "2":
        throw new Error("No puedes abrir una votacion que ya está abierta");

      case "3":
        throw new Error("No puedes abrir una votacion que ya fue cerrada");

      case "4":
        throw new Error(
          "No puedes abrir una votacion cuando los resultados ya fueron mostrados"
        );

      case "0":
        throw new Error("No puedes abrir una votacion ya finalizada");
    }
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Apertura de temporada cancelada",
    });
  }
};

export const validCerrarTemporada = async (req, res, next) => {
  try {
    const { idTemporada } = req.body;

    const [rows] = await db.query(
      "SELECT estado FROM `temporada` WHERE idTemporada = ?",
      [idTemporada]
    );

    if (rows.length == 0) {
      throw new Error("No puedes cerrar una votacion que no existe");
    }

    switch (rows[0].estado) {
      case "1":
        throw new Error("No puedes cerrar una votacion que no ha sido creada");

      case "3":
        throw new Error("No puedes cerrar una votacion que ya está cerrada");

      case "4":
        throw new Error(
          "No puedes cerrar una votacion cuando los resultados ya fueron mostrados"
        );

      case "0":
        throw new Error("No puedes cerrar una votacion ya finalizada");
    }
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Cierre de temporada cancelada",
    });
  }
};

export const validPublicTemporada = async (req, res, next) => {
    try {
      const { idTemporada } = req.body;
  
      const [rows] = await db.query(
        "SELECT estado FROM `temporada` WHERE idTemporada = ?",
        [idTemporada]
      );
  
      if (rows.length == 0) {
        throw new Error("No puedes publicar una votacion que no existe");
      }
  
      switch (rows[0].estado) {
        case "1":
          throw new Error("No puedes publicar una votacion que no ha sido creada");
  
        case "2":
          throw new Error("No puedes publicar una votacion que está abierta, primero debes cerrarla");
  
        case "4":
          throw new Error(
            "No puedes publicar una votacion 2 veces"
          );
  
        case "0":
          throw new Error("No puedes publicar una votacion ya finalizada");
      }
      next();
    } catch (error) {
      res.status(400).json({
        error: error.message,
        mensaje: "Publicacion de temporada cancelada",
      });
    }
  };

  export const validFinTemporada = async (req, res, next) => {
    try {
      const { idTemporada } = req.body;
  
      const [rows] = await db.query(
        "SELECT estado FROM `temporada` WHERE idTemporada = ?",
        [idTemporada]
      );
  
      if (rows.length == 0) {
        throw new Error("No puedes finalizar una votacion que no existe");
      }
  
      switch (rows[0].estado) {
        case "1":
          throw new Error("No puedes finalizar una votacion que no ha sido creada");
  
        case "2":
          throw new Error("No puedes finalizar una votacion que está abierta, primero debes cerrarla");
  
        case "3":
          throw new Error(
            "No puedes finalizar una votacion cerrada, primero debes publicar los resultados"
          );
  
        case "0":
          throw new Error("No puedes finalizar una votacion ya finalizada");
      }
      next();
    } catch (error) {
      res.status(400).json({
        error: error.message,
        mensaje: "Fin de temporada cancelada",
      });
    }
  };