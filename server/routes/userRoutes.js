var mongoose = require('mongoose');
const express = require("express");
const router = express.Router()
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt')


const userController = require("../controllers/usersController");
const medInfoController = require("../controllers/medInfoController");
const requestController = require("../controllers/requestController");
const verifyJWT = require("../middleware/verifyJWT");


// const client=require('twilio')(config.accountSID,config.authToken)
// router.get('/login',(req,res)=>{
//     client.verify.v2.services(config.serviceID).verifications.create({
//         to:`+${req.query.phonenumber}`,
//         channel:`${req.query.channel}`
//     }).then((data)=>{
//         res.status(200).send(data)
//     })
// })

// router.get('/verify',(req,res)=>{
//     client.verify.v2.services(config.serviceID).verificationChecks.create({
//         to:`+${req.query.phonenumber}`,
//         code:`${req.query.code}`
//     }).then((data)=>{
//         res.status(200).send(data)
//     })
// })


router.post("/register" , userController.userRegister);

router.post("/sign_in" , userController.userSignIn);

router.get("/sign_out" , userController.userSignOut);

router.route("/addMedInfo")
    .post(medInfoController.addMedInfo);

router.get("/getDetailsOfUser/:id", userController.getDetailsOfUser);

router.get("/getAllDonationsofUser/:id", userController.getAllDonationsofUser);

router.get("/getTotalBloodDonatedByUser/:id", userController.getTotalBloodDonatedByUser);

router.delete("/delUser/:id", userController.delUser);

router.get("/getRequests", requestController.getRequests);

router.delete("/delReq/:id",requestController.delReq); 


module.exports = router;