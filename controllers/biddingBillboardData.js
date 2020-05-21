const BiddingbillboardData = require('../models/biddingBillboardData');



exports.postBiddingBillboard = function (req, res, next) {
  var formData = req.body;
  if (formData.objectId == '') {
    const postBillboardData = new BiddingbillboardData({
      billboardAvailabilityFrom: formData.billboardAvailabilityFrom,
      billboardAvailabilityTo: formData.billboardAvailabilityTo,
      biddingStartDate: formData.biddingStartDate,
      biddingStartTime: formData.biddingStartTime,
      biddingEndDate: formData.biddingEndDate,
      biddingEndTime: formData.biddingEndTime,
      minBidAmount: formData.minBidAmount,
      images: formData.images,
      billboardId: formData.billboardId,
      billboardAddress: formData.billboardAddress,
      billboardType: formData.billboardType,
      billboardFacing: formData.billboardFacing,
      billboardLighting: formData.billboardLighting,
      billboardAudienceType: formData.billboardAudienceType,
      billboardCity: formData.billboardCity,
      billboardState: formData.billboardState,

    })

    postBillboardData.save((err, data) => {
      if (err) {
        res.send({
          code: 404,
          content: err,
          msg: 'user will not get from server some internal issue.'
        })
      }
      else if (data) {
        res.send({
          code: 200,
          content: data,
          msg: 'Detail inserted'
        })
      }
    })
  }
  else if (formData.objectId != '') {

    BiddingbillboardData.updateMany(
      { "_id": formData.objectId },
      { $set: formData },
      { multi: true }
    ).then((response) => {
      res.send({
        code: 200,
        msg: 'Billboard data updated successfully',
        content: formData
      });
    }).catch(() => res.status(422).send({ msg: 'something went wrong' }));
  }
}

exports.getBiddingbillboard = function (req, res, next) {
  BiddingbillboardData.find(function (err, data) {
    if (err) {
      res.send({
        msg: 'Error getting billboard',
        code: 404,
        err: err
      })
    }
    else if (data) {
      res.send({
        content: data,
        msg: 'All Bidding  billboard data',
        code: 200
      })
    }
  })
}

exports.getspecificBiddingbillboard = function(req, res, next){
  let id = req.body.id;
  BiddingbillboardData.find({"_id":id},function(err,data){
    if(err){
      res.send({
        msg:'Error getting billboard',
        code:404,
        err:err
      })
    }
    else if(data){
      res.send({
        content:data,
        msg:'Get billboard data',
        code:200
      })
    }
  })
  }

exports.deletebiddingBillboard = function (req, res, next) {

  var formData = req.body;
  BiddingbillboardData.deleteOne({ "_id": formData.objectId },
    function (err, docs) {
      if (err) {
        res.json(err);
      }
      else {
        res.send({
          code: 200,
          msg: 'Billboard data delete successfully',
          content: docs
        });
      }
    });

}
