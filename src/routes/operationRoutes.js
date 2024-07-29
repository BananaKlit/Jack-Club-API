const express = require("express");
const router = express.Router();
const allOperation = require("../controllers/operations/valetAffectation");
const {authenticateToken}=require("../controllers/auth/authController")
router.get("/",authenticateToken, allOperation.getAllOperation);
router.get("/valet-available", authenticateToken, allOperation.getAllAvailableValet);
router.get("/valetoperations", authenticateToken,allOperation.getAllOperationByValet);
router.post("/affectValet", authenticateToken,allOperation.affectValet);
// router.get("/:id", adminController.getAdminById);
// router.post("/", adminController.createAdmin);
// router.put("/:id", adminController.updateAdmin);
// router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
