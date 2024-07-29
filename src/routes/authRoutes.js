const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");

router.post("/adminLogin", authController.adminLogin);
router.post("/userLogin", authController.valetLogin);
module.exports = router;
