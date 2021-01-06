const express = require("express");
const router = express.Router();

const {
  requireSignin,
  requireAuthentication,
  adminMiddleware,
} = require("../controllers/auth.controller");
const { getUserById } = require("../controllers/user.controller");
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  removeCategory,
  getCategory,
} = require("../controllers/category.controller");

//Set parameters - params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//routers
//Create
router.post(
  "/category/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  createCategory
);

//Read
router.get("/categories", getAllCategory);
router.get("/category/:categoryId", getCategory);

//edit
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  updateCategory
);

//remove
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  removeCategory
);

module.exports = router;
