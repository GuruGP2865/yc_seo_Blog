const Post = require("../models/post.model");
const Category = require("../models/category.model");
const Hashtag = require("../models/hashtag.model");
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

exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ succes: false, err });
    }

    console.log(res.req.file.path);

    res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.fileName,
    });
  });
};

exports.createPost = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    const post = new Post(req.body);
    //console.log(res.req.file.path);

    if ("file" in res.req) {
      post.image = res.req.file.path;
    }
    

    if ("date" in req.body) {
      let date = new Date(req.body.date);
      let value = ["-" + date.getDate(), 
                (date.getMonth() + 1).toString().padStart(2, '0'), 
                date.getFullYear().toString()].join('-');
      post.date = value;
    } 

    post.save((err, post) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Post is not created",
        });
      }
      res.json({
        post
      });
    });

    //fileName: res.req.file.fileName,
  });
};



exports.getPostByIdForEdit = (req, res, next, id) => {
  Post.findById(id)
      .select('_id title intro_content content image category hashtag sidead slug date createdAt')
      .exec((err, postdata) => {
    if (err || !postdata) {
      return res.status(400).json({
        error: "No Post is found",
      });
    }
    req.post = postdata;
    //console.log(req.post)
    next();
  });
};

exports.getPostById = (req, res, next, id) => {
  Post.findById(id)
      .populate('category', '_id name')
      .populate('hashtag', '_id name')
      .populate('sidead', '_id name')
      .select('_id title intro_content content image story storyContent storyContentImage storySmallContent storySmallImage category hashtag sidead slug date createdAt')
      .exec((err, postdata) => {
    if (err || !postdata) {
      return res.status(400).json({
        error: "No Post is found",
      });
    }
    req.post = postdata;
    //console.log(req.post)
    next();
  });
};

exports.getPostBySlug = (req, res, next, slug) => {
  Post.find({ slug: slug })
      .populate('category', '_id name')
      .populate('hashtag', '_id name')
      .populate('sidead', '_id name image link')
      .exec((err, postdata) => {
    if (err) {
      return res.status(400).json({
        error: "Post not found",
      });
    }
    req.post = postdata;
    
    next();
  });
};


exports.getAllPosts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;

  let posts;
  let categories;
  let hashtags;

  Post.find()
      .populate('category', '_id name')
      .populate('hashtag', '_id name')
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(skip)
      .select('_id title intro_content image category hashtag slug createdAt ')
      .exec((err, postData) => {
      if (err) {
        return res.status(400).json({
          error: "No posts found",
        });
      }
      posts = postData;

      Category.find()
              .exec((err, categoryData) => {
                if (err) {
                  return res.status(400).json({
                      error: "No Categories found",
                    }); 
                }
                categories = categoryData;

                Hashtag.find()
                       .exec((err, hashtagData) => {
                         if (err) {
                           return res.status(400).json({
                                error: "No Categories found",
                            }); 
                         }
                        hashtags = hashtagData;
                        res.json({
                          posts,
                          categories,
                          hashtags,
                          size : posts.length
                        })

                       })
              })
    });
};



exports.getAllPostsWithContent = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;

  let posts;
  let categories;
  let hashtags;

  Post.find()
      .populate('category', '_id name')
      .populate('hashtag', '_id name')
      .populate('sidead', '_id name')
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(skip)
      .select('_id title intro_content content image category hashtag slug createdAt sidead')
      .exec((err, postData) => {
      if (err) {
        return res.status(400).json({
          error: "No posts found",
        });
      }
      posts = postData;

      Category.find()
              .exec((err, categoryData) => {
                if (err) {
                  return res.status(400).json({
                      error: "No Categories found",
                    }); 
                }
                categories = categoryData;

                Hashtag.find()
                       .exec((err, hashtagData) => {
                         if (err) {
                           return res.status(400).json({
                                error: "No Categories found",
                            }); 
                         }
                        hashtags = hashtagData;
                        res.json({
                          posts,
                          categories,
                          hashtags,
                          size : posts.length
                        })

                       })
              })
    });
};

exports.getPost = (req, res) => {
  //console.log(req.post);
  return res.json(req.post);
};

exports.getSlugPost = (req, res) => {
  
  Post.find()
      .sort({ createdAt: "desc" })
      .limit(3)
      .select('title image slug')
      .exec((err, postList) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          error: "No recomendation posts found",
        });
      }
      res.json({
        post: req.post,
        recomendPosts: postList
      })
    });

};


exports.updatePost = (req, res) => {
    upload(req, res, (err) => {
    if (err) {
      return res.json({ succes: false, err });
    }

    const post = req.post;
    //console.log(req.body);

    if ("file" in res.req) {
      post.image = res.req.file.path;
    }
    //console.log(req.body.story)
    if (req.body.story == 'true') {
      //console.log("new Updation in story")
      post.story = req.body.story;
      post.storyContent = req.body.storyContent;
      post.storyContentImage = req.body.storyContentImage;
      post.storySmallContent = req.body.storySmallContent;
      post.storySmallImage = req.body.storySmallImage;
    }

    if ("date" in req.body) {
      let date = new Date(req.body.date);
      let value = ["-" + date.getDate(), 
                (date.getMonth() + 1).toString().padStart(2, '0'), 
                date.getFullYear().toString()].join('-');
      post.date = value;
    } 

    if ("sidead" in req.body) {
      post.sidead = req.body.sidead;
    }

    post.title = req.body.title;
    post.intro_content = req.body.intro_content;
    post.content = req.body.content;
    post.hashtag = req.body.hashtag;
    post.category = req.body.category;
    post.image = req.body.bannerimage;
    
    
    post.save((err, updatedPost) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Post is not created",
        });
      }
      res.json(
        updatedPost
      );
    });

    //fileName: res.req.file.fileName,
  });
};

exports.removePost = (req, res) => {
  const post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "Post is not deleted",
      });
    }

    res.json({
      message: "Post deleted successfully",
    });
  });
};


exports.searchPost = (req, res) => {

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;

  let posts;

  Post.find()
      .or([
        {
          "title": {
          "$regex": req.query.word,
          "$options": "i"
        }},
        {
          "intro_content": {
          "$regex": req.query.word,
          "$options": "i"
        }},
        {
          "content": {
          "$regex": req.query.word,
          "$options": "i"
        }}
      ])
  .populate('category', '_id name')
  .populate('hashtag', '_id name')
  .populate('sidead', '_id name')
  .sort({ createdAt: "desc" })
  .limit(limit)
  .skip(skip)
  .select('_id title intro_content content image category hashtag slug createdAt sidead')
  .exec( (err, result) => {
    if (err) {
      return res.status(400).json({
        error: "No results found",
      });
    }
    res.json({
      posts: result
    })
  })
}

exports.latestPosts = (req, res) => {
  Post.find()
      .sort({ createdAt: "desc" })
      .limit(3)
      .select('title image slug')
      .exec((err, postList) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          error: "No recomendation posts found",
        });
      }
      res.json({
        recomendPosts: postList
      })
    });
}


exports.getStories = ( req, res ) => {

  Post.find({ category: req.category._id, story: true })
      .sort({ createdAt: "desc" })
      .limit(10)
      .select('title storyContent image storyContentImage slug createdAt')
      .exec((err, stories) => {
      if (err) {
        console.log(err)
        return res.status(400).json({
          error: "No stories found",
        });
      }
      res.json({
        stories: stories
      })
    });
}




exports.getStoryImages = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 12;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;

  Post.find({ story: true })
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(skip)
      .select('_id title storySmallContent storySmallImage slug createdAt ')
      .exec((err, postData) => {
      if (err) {
        return res.status(400).json({
          error: "No posts found",
        });
      }
      res.json({ storyImages: postData })
    });
};
