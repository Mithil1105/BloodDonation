const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/adminget", adminController.getAllUsersEntirely); //removed verifyJWT

router.get("/admininfo", adminController.adminInfo); //removed verifyJWT

router.post("/sendMsg", adminController.sendMsg);

router.post("/addDonationHistory", adminController.addDonationHistory);

router.post("/addRequests", adminController.addRequests);

router.get("/requestinfo", adminController.requestInfo);

router.post("/addInterestedDonor", adminController.addInterestedDonor);

module.exports = router;
