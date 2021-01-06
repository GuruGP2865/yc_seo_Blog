const Sidead = require("../models/sidead.model");
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




exports.createSidead = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ succes: false, err });
    }

    const sidead = new Sidead(req.body);
    //console.log(res.req.file.path);
    sidead.image = res.req.file.filename;


    sidead.save((err, ad) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Sidead not created",
        });
      }
      res.json({
        ad,
      });
    });

    //fileName: res.req.file.fileName,
  });
};

exports.getSideadById = (req, res, next, id) => {
 Sidead.findById(id).exec((err, ad) => {
  if (err || !ad) {
    return res.status(400).json({
     error: "Ad not found"
    })
  }
 req.sidead = ad;
 next();
 })
}

exports.getSidead = (req, res) => {
 return res.json(req.sidead);
}

exports.getAllSidead = (req, res) => {
  Sidead.find().select("_id name image").exec((err, sideads) => {
    if (err) {
      return res.status(400).json({
        error: "Sideads not found"
      })
    }
    return res.status(200).json(sideads);
  })
}

exports.updateSidead = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ succes: false, err });
    }

    const sidead = req.sidead;
    //console.log(res.req.file.path);
    if ("file" in res.req) {
      sidead.image = res.req.file.filename;
    }

    console.log(sidead.image)
    
    if (req.body.name != null){
      sidead.name = req.body.name;
    }
    
    if (req.body.link != null){
      sidead.link = req.body.link;
    }

    sidead.save((err, ad) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Sidead not created",
        });
      }
      res.json({
        ad,
      });
    });

    //fileName: res.req.file.fileName,
  });
}

exports.removeSidead = (req, res) => {
 const sidead = req.sidead;
 sidead.remove((err, ad) => {
  if (err) {
   res.status(400).json({
    error: "Given sidead is not deleted"
   })
  }
  res.json({
   message: "Deleted successfully"
  })
 })
}