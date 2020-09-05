const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: `${_dirname}/../../Client/Public/Uploads/`,
  file: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: Storage,
}).single("file");

module.exports = upload;
