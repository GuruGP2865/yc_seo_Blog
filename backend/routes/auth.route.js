const express = require("express");
const router = express.Router();

//validatiion
const {
  validRegister,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

//Load Controllers
const {
  registerController,
  activationController,
  loginController,
  forgetController,
  resetController,
  googleController,
  facebookController,
} = require("../controllers/auth.controller.js");

//Routes to different code
router.post("/register", validRegister, registerController);
router.post("/activation", activationController);
router.post("/login", validLogin, loginController);
router.put("/forgotpassword", forgotPasswordValidator, forgetController);
router.put("/resetpassword", resetPasswordValidator, resetController);
router.post("/googlelogin", googleController);
router.post("/facebooklogin", facebookController);

module.exports = router;
