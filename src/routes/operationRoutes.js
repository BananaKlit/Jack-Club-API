const express = require("express");
const router = express.Router();
const allOperation = require("../controllers/operations/valetAffectation");

/**
 * @swagger
 * /operations:
 *   get:
 *     summary: Get all operations
 *     description: Retrieve a list of all operations
 *     tags: [Operations]
 *     responses:
 *       200:
 *         description: Successfully retrieved all operations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_operation:
 *                     type: string
 *                     example: 308
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-18T15:33:47.084159+00:00"
 *                   id_hotspot:
 *                     type: string
 *                     example: 1
 *                   id_service:
 *                     type: string
 *                     example: 3
 *                   id_client:
 *                     type: string
 *                     example: "03b13688-e997-429c-842f-5e48a7679ecd"
 *                   id_valet:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   code_operation:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   status:
 *                     type: string
 *                     example: "Pending"
 *                   picture_after:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   valet_retour:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   picture_before:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   codeScan:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   isScanned:
 *                     type: boolean
 *                     example: false
 *                   isConfirmed:
 *                     type: boolean
 *                     example: false
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error message"
 */
router.get("/", allOperation.getAllOperation);
router.get("/valet-available", allOperation.getAllAvailableValet);
router.get("/valetoperations", allOperation.getAllOperationByValet);
/**
 * @swagger
 * /operations/affectValet:
 *   post:
 *     summary: Assign a valet to an operation
 *     description: Assign a valet to an operation and update the status
 *     tags: [Operations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idValet:
 *                 type: string
 *                 example: "793fbf03-c2da-487d-a380-c18c76c3fdc1"
 *               codeOperation:
 *                 type: string
 *                 example: "2P945M2RQ"
 *     responses:
 *       200:
 *         description: Successfully assigned valet to operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Opdata:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       code_operation:
 *                         type: string
 *                       id_valet:
 *                         type: string
 *                       status:
 *                         type: string
 *                       affected_at:
 *                         type: string
 *                         format: date-time
 *                       valet_aller:
 *                         type: string
 *                       affected_return_at:
 *                         type: string
 *                         format: date-time
 *                 valetData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_valet:
 *                         type: string
 *                       codeOperation:
 *                         type: string
 *                       affectation:
 *                         type: boolean
 *                 confirmed:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_valet:
 *                         type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/affectValet", allOperation.affectValet);
// router.get("/:id", adminController.getAdminById);
// router.post("/", adminController.createAdmin);
// router.put("/:id", adminController.updateAdmin);
// router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
