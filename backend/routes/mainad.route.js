const express = require("express");
const router = express.Router();

const {
  requireSignin,
  requireAuthentication,
  adminMiddleware,
} = require("../controllers/auth.controller");
const { getUserById } = require("../controllers/user.controller");
const {
 createMainad,
 getMainadById,
 getMainad,
 updateMainad,
 removeMainad,
 getAllMainad
} = require("../controllers/mainad.controller");

router.param("userId", getUserById);
router.param("mainadId", getMainadById);


router.post("/mainad/create/:userId", 
            requireSignin,
            requireAuthentication,
            adminMiddleware,
            createMainad);

router.get("/mainads", getAllMainad);

router.get("/mainad/:mainadId", getMainad);         

router.put("/mainad/:mainadId/:userId", 
           requireSignin, 
           requireAuthentication,
           adminMiddleware,
           updateMainad );

router.delete("/mainad/:mainadId/:userId", 
               requireSignin,
               requireAuthentication,
               adminMiddleware,
               removeMainad);  

module.exports = router;               