import jwt from "jsonwebtoken";
import { db } from "../../db.js";
import { verifyPassword } from "../../helpers/bcrypt/compare.js";
import { hashPassword } from "../../helpers/bcrypt/hash.js";
import { estadoUltimaTemporada } from "../../helpers/querys/ultimaTemporada.js";
import { JWT_ACCESS } from "../../config.js";

export const crearAd = async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.apellido) {
      throw new Error("Nombre y apellido es obligatorio");
    }

    const { nombre, apellido, documento, contrasena } = req.body;

    const query = await db.query(
      "INSERT INTO `usuarios`(`nombre`, `apellido`, `documento`, `idRol`) VALUES (?,?,?, 1)",
      [nombre, apellido, documento]
    );

    const id = query[0].insertId;
    console.log(id);

    const hash = await hashPassword(contrasena);

    if (hash.error) {
      throw new Error(hash.error);
    }

    await db.query(
      "INSERT INTO `admin`(`contrasena`, `idUsuario`) VALUES (?,?)",
      [hash, id]
    );

    res.status(201).json({
      mensaje: "¡Creado con exito!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Error al crear",
    });
  }
};

export const pruebaBcrypt2 = async (req, res) => {
  try {
    if (!req.body.documento || !req.body.contrasena) {
      throw new Error("Todos los datos son obligatorios");
    }

    const { documento, contrasena } = req.body;

    console.log(documento, contrasena);
    

    const [rows] = await db.query(
      "SELECT * FROM `admin` a INNER JOIN `usuarios` b ON a.idUsuario = b.idUsuario WHERE b.documento = ?",
      [documento]
    ); 

    if(rows.length == 0) {
      throw new Error("Documento o contraseña incorrectos");
    }

    const conValid = await verifyPassword(contrasena, rows[0].contrasena);

    console.log(conValid);
    

    if (conValid.error || !conValid) {
      throw new Error(`Documento o contraseña incorrectos, ${conValid.error}`);
    }

    const [temp] = await db.query(
      "SELECT * FROM temporada ORDER BY idTemporada DESC LIMIT 1"
    );

    const accessToken = jwt.sign(
      {
        idAdmin: rows[0].idAdmin,
        idUsuario: rows[0].idUsuario,
        nombre: rows[0].nombre,
        apellido: rows[0].apellido,
        idRol: rows[0].idRol,
        idTemporada: temp[0].idTemporada,
      },
      JWT_ACCESS,
      { expiresIn: "1h" }
    );

    res.status(202).json({
      data: accessToken,
      mensaje: "¡Acesso valido!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      mensaje: "Acceso denegado",
    });
  }
};
