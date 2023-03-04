import multer from 'multer';
import { extname, resolve } from 'path';

//* ensure we don't have 2 files in the same millisecond
const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('File must be PNG or JPG'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    //* generate new name for received file :: DATE NOW
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`);
    },
  }),
};
