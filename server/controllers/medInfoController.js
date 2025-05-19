const MedInfo = require ("../models/medInfoModel");

const addMedInfo = async (req, res) => {
    var newMedInfo = new MedInfo({
      donor_id: req.body.donor_id,
      bldgrp : req.body.bldgrp,
      age : req.body.age,
      sex : req.body.sex,
    });
    try{
      await newMedInfo.save()
      res.json({ result: newMedInfo, message: "Information Added Successfuly" });
    }catch(err)
    {
      console.log(err);
      res.json({ result: err, message: "Error adding medinfo" });
    }
}

module.exports = {addMedInfo};