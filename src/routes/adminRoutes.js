const express = require("express");
const router = express.Router();
const adminController = require("../controllers/Responsable/adminController");
const {authenticateToken}=require("../controllers/auth/authController")

router.get("/",authenticateToken, adminController.getAllAdmins);
router.get("/:id",authenticateToken, adminController.getAdminById);
router.post("/",authenticateToken, adminController.createAdmin);
router.put("/:id", authenticateToken, adminController.updateAdmin);
router.delete("/:id", authenticateToken, adminController.deleteAdmin);

module.exports = router;
