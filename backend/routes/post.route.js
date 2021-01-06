const express = require("express");
const router = express.Router();

const {
  requireSignin,
  requireAuthentication,
  adminMiddleware,
} = require("../controllers/auth.controller");

const {
  getPostById,
  getPostBySlug,
  getPost,
  updatePost,
  createPost,
  removePost,
  getAllPosts,
  uploadFile,
  getAllPostsWithContent,
  searchPost,
  latestPosts,
  getSlugPost,
  getPostByIdForEdit,
  getStories,
  getStoryImages
} = require("../controllers/post.controller");

const imageUploader = require('../controllers/image.upload');

const { getUserById } = require("../controllers/user.controller");
const { getCategoryById } = require("../controllers/category.controller");

router.param("postId", getPostById);
router.param("postIdForEdit", getPostByIdForEdit);
router.param("postSlug", getPostBySlug);
router.param("userId", getUserById);
router.param("categoryId", getCategoryById)

router.get("/post/:postSlug", getSlugPost);
router.get("/postbyid/:postId", getPost);
router.post("/posts", getAllPosts);
router.post("/postswithcontent", getAllPostsWithContent);

router.post("/post/recomendations", latestPosts);

router.post("/posts/search", searchPost);

router.post(
  "/post/create/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  createPost
);

//upload image in server
router.post(
  "/post/uploadfile/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  uploadFile
);

router.put(
  "/post/:postIdForEdit/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  updatePost
);

router.delete(
  "/post/:postId/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  removePost
);



router.post(
  '/post/imageupload/:userId',
  requireSignin,
  requireAuthentication,
  adminMiddleware
  , imageUploader.uploadImages, imageUploader.resizeImages, imageUploader.getResult
)


/**stories */

router.get("/posts/stories/:categoryId", getStories);

router.post("/storyimages", getStoryImages);

//export router
module.exports = router;
