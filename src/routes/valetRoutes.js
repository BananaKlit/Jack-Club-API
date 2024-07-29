const express = require("express");
const router = express.Router();
const valetController = require("../controllers/valets/valetController");
const {authenticateToken}=require("../controllers/auth/authController")
router.get("/",authenticateToken, valetController.getAllValets);
router.get("/:id",authenticateToken, valetController.getValetById);
router.post("/", authenticateToken,valetController.createValet);
router.put("/:id", authenticateToken, valetController.updateValet);
router.delete("/:id", authenticateToken, valetController.deleteValet);

module.exports = router;
