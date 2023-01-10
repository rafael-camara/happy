import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.join(__dirname, '..', '..', 'uploads'))
    },
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      callback(null, fileName);
    },
  })
};
