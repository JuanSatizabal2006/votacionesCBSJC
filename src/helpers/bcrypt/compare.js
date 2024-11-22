import bcrypt from "bcrypt";

export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch; // Retorna true si las contraseñas coinciden
  } catch (error) {
    return {
        error : "Error al verificar la contraseña"};
  }
};
