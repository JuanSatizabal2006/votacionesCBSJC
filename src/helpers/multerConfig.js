import multer from 'multer';

// Configuración de almacenamiento
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {   
    cb(null, `${file.originalname}`);
  },
});

// Middleware de subida de archivos
const upload = multer({ storage });

export default upload;