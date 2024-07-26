const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clients/clientController");
/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     description: Retrieve a list of all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Successfully retrieved all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     description: First name of the client
 *                     example: ilyass
 *                   lastName:
 *                     type: string
 *                     description: Last name of the client
 *                     example: hakim
 *                   idClient:
 *                     type: string
 *                     description: ID of the client
 *                     example: 03b13688-e997-429c-842f-5e48a7679ecd
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date of the client record
 *                     example: 2024-07-16T09:11:04.507373+00:00
 *                   cin:
 *                     type: string
 *                     description: CIN of the client
 *                     example: qwerty1234
 *                   status:
 *                     type: boolean
 *                     description: Status of the client
 *                     example: true
 *                   picture:
 *                     type: string
 *                     description: URL to the client's picture
 *                     example: https://gqxphzsnzqsfsjotvlbz.supabase.co/storage/v1/object/public/valetClubBucket/profilePic/1721121136780000.png
 *                   phone:
 *                     type: integer
 *                     description: Phone number of the client
 *                     example: 612103949
 *                   rate:
 *                     type: integer
 *                     description: Rating of the client
 *                     example: 0
 *                   codeClient:
 *                     type: string
 *                     description: Code of the client
 *                     example: 03b13688-...
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Bad Request
 */
router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getClientById);
router.post("/", clientController.createClient);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;
