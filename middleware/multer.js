const multer = require('multer');
const path = require('path');
// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });
  
module.exports = upload;