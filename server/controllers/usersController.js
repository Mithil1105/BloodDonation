const MedInfo = require("../models/medInfoModel");
const User = require("../models/userModel");
const DonationHistory = require("../models/donationHistoryModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  var newUser = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phonenum: req.body.phonenum,
  });

  if (
    !newUser.firstName ||
    !newUser.lastName ||
    !newUser.email ||
    !newUser.password ||
    !newUser.phonenum
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const duplicate = await User.findOne({ email: newUser.email }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "Email already exists" });
  }

  try {
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    await newUser.save();
    res.status(201).json({ result: newUser, message: "Registered Successful" });
  } catch (err) {
    console.log(err)
    res.json({ result: err, message: "Registration Failed" });
  }
};

const userSignIn = async (req, res) => {
  try {
    const foundUser = await User.findOne({
      email: req.body.email,
    });

    if (foundUser) {
      bcrypt.compare(
        req.body.password,
        foundUser.password,
        async (error, response) => {
          if (response) {
            const donor_id = foundUser.donor_id;
            const role = foundUser?.role;

            const accessToken = jwt.sign(
              { UserInfo: { donor_id: donor_id, role: role } },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "10s" }
            );
            const refreshToken = jwt.sign(
              { donor_id: donor_id },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            );

            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();

            res.cookie("jwt", refreshToken, {
              httpOnly: true,
              sameSite: "None",
              secure: true,
              maxAge: 24 * 60 * 60 * 1000,
            }); //secure: true for chrome

            res.json({
              auth: true,
              accessToken: accessToken,
              result: foundUser,
              role: role,
              message: "Login Successful",
            });
          } else {
            res.json({
              auth: false,
              message: "wrong username/password combination",
            });
          }
        }
      );
      // console.log(`User ${foundUser} logged in`);
    } else {
      res.status(403).json({ auth: false, message: "no user exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const userSignOut = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (foundUser) {
      foundUser.refreshToken = "";
      const result = await foundUser.save();
      if (!result) {
        return res.sendStatus(500);
      }
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign-out failed" });
  }
};

const getDetailsOfUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const donorData = await User.aggregate([
      {
        $match: { donor_id: userId },
      },
      {
        $lookup: {
          from: "medinfos",
          localField: "donor_id",
          foreignField: "donor_id",
          as: "medInfo",
        },
      },
      {
        $unwind: "$medInfo",
      },
      {
        $project: {
          _id: 0,
          donor_id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phonenum: 1,
          createdAt: 1,
          role: 1,
          refreshToken: 1,
          "medInfo.bldgrp": 1,
          "medInfo.age": 1,
          "medInfo.sex": 1,
          "medInfo.lastDonationDate": 1,
          "medInfo.totalAmountDonated": 1,
        },
      },
    ]);

    if (donorData.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(donorData[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching donor data." });
  }
};

const getAllDonationsofUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const donorDonationData = await DonationHistory.find({ donor_id: userId });

    res.json(donorDonationData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching donor data." });
  }
};

const getTotalBloodDonatedByUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const totalDonatedBlood = await DonationHistory.aggregate([
      {
        $match: { donor_id: userId }, // Match rows with the specified donor_id
      },
      {
        $group: {
          _id: null, // Group all matched rows
          totalAmountDonated: { $sum: "$amount_Donated" }, // Calculate the sum of amount_Donated
        },
      },
    ]);

    if (totalDonatedBlood.length > 0) {
      res.json({ totalAmountDonated: totalDonatedBlood[0].totalAmountDonated });
    } else {
      res.json({ totalAmountDonated: 0 });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "An error occurred while calculating total donated blood.",
      });
  }
};

  const delUser = async(req,res) => {
    const userid = req.params.id;
    console.log(userid);

    try{
      const deletedReq = await User.deleteOne({donor_id:userid});
  
      if (deletedReq) {
        console.log('Request deleted successfully:', deletedReq);
        res.status(200).json({message : 'Deleted Successfully'})
      } else {
        console.log('Request not found');
      }
  
    }
    catch(err)
    {
      console.log(err);
    }
  }


module.exports = {
  userRegister,
  userSignIn,
  userSignOut,
  getDetailsOfUser,
  getAllDonationsofUser,
  getTotalBloodDonatedByUser,
  delUser,
};
