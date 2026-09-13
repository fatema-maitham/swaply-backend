const multer = require('multer');
const { skillStorage } = require('../config/cloudinary');

const skillUpload = multer({
  storage: skillStorage,
});

module.exports = skillUpload;