const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: `../Client/public/uploads/`,
  filename: (req, file, cb) => {
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
