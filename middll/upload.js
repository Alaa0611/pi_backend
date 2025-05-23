const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadPath = path.join(__dirname, '..', 'images');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `cover-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});



const upload = multer({ storage: storage });

module.exports = upload;
