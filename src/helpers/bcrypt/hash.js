import bcrypt from "bcrypt";
import { SALT } from "../../config.js";

export const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(SALT)); // Genera el salt
    const hashed = await bcrypt.hash(plainPassword, salt); // Hashea la contraseña con el salt
    return hashed;
  } catch (error) {
    return {
        error : error.message
    }
  }
};