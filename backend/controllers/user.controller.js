const User = require("../models/auth.model");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found ",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  return res.json({
    _id: req.profile._id,
    name: req.profile.name,
    email: req.profile.email,
    posts: req.profile.posts,
    createdAt: req.profile.createdAt
  });
}

exports.getAllUsers = (req, res) => {
  User.find().select("_id name email role posts").exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong"
      })
    }

    return res.status(200).json(users);
  })
}


exports.getAllAdmins =  (req, res) => {
  User.find({ role : "Admin"}).select("_id name email role posts").exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong"
      })
    }

    return res.status(200).json(users);
  })
}


exports.addBookmark = (req, res) => {

  let posts = [];
  req.profile.posts.forEach(post => {
    if (post.equals(req.post._id) == false) {
      posts.push(post)
    }
  });

  posts.push(req.post._id);


  
  User.findByIdAndUpdate(
    { _id : req.profile._id },
    { $set : { posts : posts}},
    (err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: "Post not added"
        })
      }
      res.json(updatedUser.posts);
    }
  )


  /*
  const user = req.profile;
  if (user.posts.indexOf(req.post._id < 0)) {
    user.posts.push(req.post._id);
  }
  
  user.save((err, updatedUser) => {
     if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Post is not added",
        });
      }
      //console.log(updatedUser)
      res.json(
        updatedUser.posts
      );
  })
  */
}


exports.removeBookmark = (req, res) => {

  /*
  let posts = [];
  req.profile.posts.forEach(post => {
    if (post != req.post._id) {
      posts.push(post)
    }
  });
  */

  //posts.push(req.post._id);
  
  User.findByIdAndUpdate(
    { _id : req.profile._id },
    { $pull : { posts : req.post._id}},
    (err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: "Post not added"
        })
      }
      res.json(updatedUser.posts);
    }
  )




  /*
  const user = req.profile;
  if (user.posts.indexOf(req.post._id >= 0)) {
   user.posts = req.profile.posts.filter((value, index) => value != req.post._id);
  }
  
  user.save((err, updatedUser) => {
     if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Post is not removed",
        });
      }
      res.json(
        updatedUser.posts
      );
  })
  */
}

exports.getBookmarkPost = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;

  User.findById(req.profile._id)
      .populate({
        path: 'posts',
        options: {
          limit: limit,
          skip: skip
        }
      })
      .exec((err, userData) => {
    if (err || !userData) {
      return res.status(400).json({
        error: "No user was found",
      });
    }
    res.json(userData.posts)
  });
}