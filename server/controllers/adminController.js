require('dotenv').config();
const User = require("../models/userModel");
const MedInfo = require("../models/medInfoModel");
const mongoose = require("mongoose");
const DonationHistory = require("../models/donationHistoryModel");
const RequestInfo = require("../models/requestInfoModel");
const Request = require("../models/requestModel");
const InterestedDonor = require("../models/interestedDonorModel");

const db = mongoose.connection;
const client = require("twilio")(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const getAllUsersEntirely = async (req, res) => {
  try {
    const usersWithMedInfo = await User.aggregate([
      {
        $lookup: {
          from: "medinfos", // The name of the MedInfo collection
          localField: "donor_id", // Field from the User collection
          foreignField: "donor_id", // Field from the MedInfo collection
          as: "medinfo", // Alias for the joined data
        },
      },
    ]);

    res.json(usersWithMedInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching user data with MedInfo.",
    });
  }
};

const adminInfo = async (req, res) => {
  const result = await db
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "medinfos",
          localField: "donor_id",
          foreignField: "donor_id",
          as: "usersdetails",
        },
      },
    ])
    .toArray();
  const bloodGroupMap = new Map();
  bloodGroupMap.set("A+", 0);
  bloodGroupMap.set("A-", 0);
  bloodGroupMap.set("B+", 0);
  bloodGroupMap.set("B-", 0);
  bloodGroupMap.set("AB+", 0);
  bloodGroupMap.set("AB-", 0);
  bloodGroupMap.set("O+", 0);
  bloodGroupMap.set("O-", 0);

  result.forEach((entry) => {
    bloodGroupMap.set(
      entry?.usersdetails[0]?.bldgrp,
      bloodGroupMap.get(entry?.usersdetails[0]?.bldgrp) + 1
    );
  });

  const jsonObject = {};
  for (let [key, value] of bloodGroupMap) {
    const bld = `${key}`;
    const num = parseInt(`${value}`);
    jsonObject[bld] = num;
  }

  const palette = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF0000",
    "#800080",
    "#0000FF",
    "#008000",
  ];
  let paletteCopy = [...palette];
  function getRandomNonRepeating() {
    if (paletteCopy.length === 0) {
      paletteCopy = [...palette]; // reset the copy if all elements have been used
    }
    const randomIndex = Math.floor(Math.random() * paletteCopy.length);
    const selectedElement = paletteCopy.splice(randomIndex, 1);
    return selectedElement[0];
  }

  let op = Object.entries(jsonObject).map(([label, value, i]) => ({
    label,
    value,
    color: getRandomNonRepeating(),
  }));
  res.json({ result: result, piedata: op });
};

const requestInfo = async (req, res) => {
  try {
    const requestsCollection = db.collection("requests");
    const result = await requestsCollection
      .aggregate([
        {
          $lookup: {
            from: "requestinfos",
            localField: "request_id",
            foreignField: "request_id",
            as: "requestdetails",
          },
        },
      ])
      .toArray();

    res.json(result);
  } catch (error) {
    console.error("Error in /request-info route:", error);
    res.status(500).send("Internal Server Error");
  }
};

const sendMsg = async (req, res) => {
  const BloodGroup = req.body.bldgrp;
  const txtMsg = req.body.smsText;
  try {
    // const fourMonthsAgo = new Date();
    // fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

    console.log(BloodGroup);
    console.log(txtMsg);
    const usersWithBloodGroup = await MedInfo.find({
      bldgrp: { $in: BloodGroup },
    });
    console.log(usersWithBloodGroup);

    const phoneNum_arr = usersWithBloodGroup.map((user) => user.donor_id);

    const phoneNumbers = await User.find(
      { donor_id: { $in: phoneNum_arr } },
      "phonenum"
    );

    const phoneNumbersArr = phoneNumbers.map((user) => user.phonenum);
    //console.log(phoneNumbersArr);
    // for (let k = 0; k < phoneNumbersArr.length; k++) {
    //   client.messages
    //     .create({
    //       to: "+" + phoneNumbersArr[k],
    //       from: process.env.TWILIO_PHONE_NUM,
    //       body: txtMsg,
    //     })
    //     .then((message) => console.log("Message sent to", phoneNumbersArr[k]));
    // }

    res.status(200).json({ message: "Messages sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while sending messages" });
  }
};

const addDonationHistory = async (req, res) => {
  try {
    const { donor_id, request_id, bldGrpDonated, amount_Donated } = req.body;

    const interestedDonorEntry = await InterestedDonor.findOne({ request_id, donor_id });

    if (interestedDonorEntry) {
      await InterestedDonor.deleteOne({ request_id, donor_id });

      const requestInfo = await RequestInfo.findOne({ request_id });

      if (requestInfo) {
        requestInfo.noOfInterestedDonors -= 1;
        await requestInfo.save();
      } else {
        console.error("RequestInfo document not found for request_id:", request_id);
      }
    }

    const newDonation = new DonationHistory({
      donor_id,
      request_id,
      bldGrpDonated,
      amount_Donated,
    });

    await newDonation.save();

    const medinfo = await MedInfo.findOne({ donor_id });

    if (medinfo) {
      medinfo.totalAmountDonated += amount_Donated;
      medinfo.lastDonationDate = newDonation.dateOfDonation;
      await medinfo.save();
    } else {
      console.error("MedInfo document not found for donor_id:", donor_id);
    }

    const requestinfo = await Request.findOne({ request_id });

    if (requestinfo) {
      requestinfo.amount_Remaining -= amount_Donated;
      await requestinfo.save();
    } else {
      console.error(
        "requestinfo document not found for request_id:",
        request_id
      );
    }

    res.status(201).json({
      result: newDonation,
      message: "Donation history entry added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding the donation history entry",
    });
  }
};

const addRequests = async (req, res) => {
  try {
    const {
      bldGrpRequired,
      amount_Required,
      amount_Remaining,
      endDate_of_Request,
      donationType,
      emergencyLevel,
      location,
      locUrl,
    } = req.body;

    const newRequestInfo = new RequestInfo({
      endDate_of_Request,
      donationType,
      emergencyLevel,
      location,
      locUrl
    });

    await newRequestInfo.save();
    const request_id = newRequestInfo.request_id;

    const newRequest = new Request({
      request_id,
      bldGrpRequired,
      amount_Required,
      amount_Remaining,
    });

    await newRequest.save();

    res.status(201).json({
      result: newRequest,
      message: "New request entry added successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the request entry" });
  }
};

const addInterestedDonor = async (req, res) => {
  const { requestId, donorId } = req.body;

  try {
    await InterestedDonor.create({ request_id: requestId, donor_id: donorId });

    const requestInfo = await RequestInfo.findOne({ request_id: requestId });

    if (requestInfo) {
      requestInfo.noOfInterestedDonors += 1;

      await requestInfo.save();

      res.status(200).json({ message: 'Interested donor added successfully.' });
    } else {
      res.status(404).json({ error: `RequestInfo with request_id ${requestId} not found.` });
    }
  } catch (error) {
    console.error('Error adding interested donor:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  getAllUsersEntirely,
  adminInfo,
  sendMsg,
  addDonationHistory,
  addRequests,
  requestInfo,
  addInterestedDonor
};
