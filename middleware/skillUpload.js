const multer = require('multer');

const { profileStorage } = require('../config/cloudinary');

const upload = multer({
  storage: profileStorage,
});

module.exports = upload;