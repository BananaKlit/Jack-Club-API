const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");

router.post("/adminLogin", authController.adminLogin);
router.post("/valetLogin", authController.valetLogin);
router.post("/clientLogin", authController.clientLogin);
module.exports = router;
