const express = require("express");
const router = express.Router();

const {
  requireSignin,
  requireAuthentication,
  adminMiddleware,
} = require("../controllers/auth.controller");
const { getUserById } = require("../controllers/user.controller");
const {
 createSidead,
 getSideadById,
 getSidead,
 getAllSidead,
 updateSidead,
 removeSidead
} = require("../controllers/sidead.controller");

router.param("userId", getUserById);
router.param("sideadId", getSideadById);

router.post("/sidead/:userId", 
           requireSignin,
           requireAuthentication,
           adminMiddleware,
           createSidead);

router.get("/sideads", getAllSidead);

router.get("/sidead/:sideadId", getSidead);

router.put("/sidead/:sideadId/:userId", 
           requireSignin,
           requireAuthentication,
           adminMiddleware,
           updateSidead);

router.delete("/sidead/:sideadId/:userId", 
              requireSignin,
              requireAuthentication,
              adminMiddleware,
              removeSidead);
              
module.exports = router;              