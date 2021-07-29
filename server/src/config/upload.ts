import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const dirPath = path.join(__dirname, './../../uploads');

export default {
  // directory: tmpFolder,

  storage: multer.diskStorage({
    destination: function (request, file, cb) {
      cb(null, dirPath + folder);
    },

    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
