const Request = require('../models/requestModel'); 
const RequestInfo = require('../models/requestInfoModel');

const getRequests = async (req, res) => {
  try {
    const joinedData = await Request.aggregate([
      {
        $lookup: {
          from: 'requestinfos',
          localField: 'request_id',
          foreignField: 'request_id',
          as: 'requestInfo',
        },
      },
      {
        $unwind: '$requestInfo',
      },
      {
        $project: {
          _id: 0,
          request_id: 1,
          bldGrpRequired: 1,
          amount_Required: 1,
          amount_Remaining: 1,
          isDone: 1,
          startDate_Of_Request: '$requestInfo.startDate_Of_Request',
          endDate_of_Request: '$requestInfo.endDate_of_Request',
          donationType: '$requestInfo.donationType',
          emergencyLevel: '$requestInfo.emergencyLevel',
        },
      },
    ]);

    res.json(joinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching joined data' });
  }
};

const delReq = async(req,res) => {
  const reqid = req.params.id;
  console.log(reqid);

  try{
    const deletedReq = await Request.deleteOne({request_id:reqid});

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
module.exports = {getRequests,delReq};

