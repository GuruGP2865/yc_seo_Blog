const express = require("express");
const router = express.Router();

const { getUserById, getAllUsers, getAllAdmins, getUser, addBookmark, removeBookmark, getBookmarkPost } = require("../controllers/user.controller");
const {
  requireSignin,
  requireAuthentication,
  adminMiddleware,
} = require("../controllers/auth.controller");
const { getPostById } = require("../controllers/post.controller");

router.param("userId", getUserById);
router.param("postId", getPostById);

router.get("/user/:userId", requireSignin, requireAuthentication, getUser);

router.get("/users/:userId", requireSignin, requireAuthentication, adminMiddleware, getAllUsers);

router.get("/admins/:userId", requireSignin, requireAuthentication, adminMiddleware, getAllAdmins);

router.post("/user/:userId/:postId", requireSignin, requireAuthentication, addBookmark);

router.delete("/user/:userId/:postId", requireSignin, requireAuthentication, removeBookmark);

router.get("/user/bookmarks/:userId", requireSignin, requireAuthentication, getBookmarkPost);

module.exports = router;