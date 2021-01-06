const Mainad = require("../models/mainad.model");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single("file");




exports.createMainad = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ succes: false, err });
    }

    const mainad = new Mainad(req.body);
    //console.log(res.req.file.path);
    mainad.image = res.req.file.path;
    mainad.save((err, ad) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Mainad not created",
        });
      }
      res.json({
        ad,
      });
    });

    //fileName: res.req.file.fileName,
  });
};

exports.getMainadById = (req, res, next, id) => {
 Mainad.findById(id).exec((err, ad) => {
  if (err || !ad) {
    return res.status(400).json({
     error: "Ad not found"
    })
  }
  req.mainad = ad;
  next();
 })
}

exports.getMainad = (req, res) => {
 return res.json(req.mainad);
}

exports.getAllMainad = (req, res) => {
  Mainad.find().exec((err, mainads) => {
    if (err) {
      return res.status(404).json({
        error: "Mainads not found"
      })
    }
    return res.status(200).json(mainads);
  })
}

exports.updateMainad = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ succes: false, err });
    }
    const mainad = req.mainad;
    //console.log(res.req.file.path);
    if ("file" in res.req) {
      mainad.image = res.req.file.path;
    }
    
    if (req.body.name != null){
      mainad.name = req.body.name;
    }
    
    if (req.body.link != null){
      mainad.link = req.body.link;
    }
    
    mainad.save((err, ad) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Mainad not created",
        });
      }
      res.json({
        ad,
      });
    });

    //fileName: res.req.file.fileName,
  });
} 


exports.removeMainad = (req, res) => {
 const mainad = req.mainad;
 mainad.remove((err, ad ) => {
  if (err) {
   res.status(400).json({
    error: "Given mainad is not deleted"
   })
  }
  res.json({
   message: "mainad Deleted successfully"
  })
 })
}
