// middll/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            const dir = 'uploads/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        },
    filename: function (req, file, cb) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
