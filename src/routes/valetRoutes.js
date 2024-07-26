const express = require("express");
const router = express.Router();
const valetController = require("../controllers/valetController");

router.get("/", valetController.getAllValets);
router.get("/:id", valetController.getValetById);
router.post("/", valetController.createValet);
router.put("/:id", valetController.updateValet);
router.delete("/:id", valetController.deleteValet);

module.exports = router;
