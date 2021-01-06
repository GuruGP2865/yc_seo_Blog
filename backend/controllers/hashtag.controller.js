const Hashtag = require("../models/hashtag.model");

exports.getHashtagById = (req, res, next, id) => {
  Hashtag.findById(id).exec((err, hash) => {
    if (err || !hash) {
      return res.status(400).json({
        error: "Hashtag not found",
      });
    }
    req.hashtag = hash;
    next();
  });
};

exports.createHashtag = (req, res) => {
  const hashtag = new Hashtag(req.body);
  hashtag.save((err, hash) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Not able to save hashtag in DB",
      });
    }
    res.json({
      hash,
    });
  });
};

exports.getAllHashtag = (req, res) => {
  Hashtag.find().exec((err, hashtags) => {
    if (err) {
      return res.status(400).json({
        error: "No Hashtags found",
      });
    }
   res.status(200).json(hashtags);
  });
};

exports.getHashtag = (req, res) => {
  return res.json(req.hashtag);
};

exports.updateHashtag = (req, res) => {
  const hashtag = req.hashtag;
  hashtag.name = req.body.name;
  hashtag.save((err, updatedHashtag) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update Hashtag.",
      });
    }
    res.json(updatedHashtag);
  });
};

exports.removeHashtag = (req, res) => {
  const hashtag = req.hashtag;
  hashtag.remove((err, hash) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to remove hashtag",
      });
    }
    res.json({
      message: "Successfully Deleted",
    });
  });
};

exports.searchHashtag = (req, res) => {
  Hashtag.find({
    "name": {
      "$regex": req.query.word,
      "$options": "i"
    }
  }, function(err, result) {
    if (err) {
      return res.status(400).json({
        error: "No results found",
      });
    }
    res.json({
      results: result
    })
  })
}