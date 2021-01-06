
const multer = require("multer");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.single("file"); // limit to 10 images

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
     if (err) {
      console.log(err)
    }

    // Everything is ok.
    next();
  });
};


const sharp = require("sharp");

const resizeImages = async (req, res, next) => {
  //console.log(req.file)
  let harizontalSize = 480
  let verticalSize = 360

  if (req.body.type === "storySmallImage") {
    harizontalSize = 360
    verticalSize = 360
  } else if (req.body.type === "story") {
    harizontalSize = 480
    verticalSize = 720
  } else if (req.body.type === "logo") {
    harizontalSize = 240
    verticalSize = 240
  }


  let filename = `${Date.now()}_${req.file.originalname}`;
  await sharp(req.file.buffer)
        .resize(harizontalSize, verticalSize)
        .toFormat("jpeg")
        .jpeg({ quality: 60 })
        .toFile(`uploads/${filename}`);

  req.newfilename = filename;
  next();
};


const getResult = async (req, res) => {

  return res.json({
   filename: req.newfilename
  });
};

module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  getResult: getResult
};