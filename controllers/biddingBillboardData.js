const BiddingbillboardData = require('../models/biddingBillboardData');



exports.postBiddingBillboard = function(req,res,next){
  var formData = req.body;
  if(formData.objectId == ''){
  const postBillboardData = new BiddingbillboardData({
    minimumBidAmount:formData.minimumBidAmount,
    billboardAmount:formData.billboardAmount,
    biddingStartDate:formData.biddingStartDate,
    biddingStartTime:formData.biddingStartTime,
    biddingEndDate:formData.biddingEndDate,
    biddingEndTime:formData.biddingEndTime,
    bilboardDetailData:formData.bilboardDetailData
  })
  
  postBillboardData.save((err,data) => {
    if(err){
      res.send({
        code:404,
        content:err,
        msg:'user will not get from server some internal issue.'
      })
    }
    else if(data){
      res.send({
        code:200,
        content:data,
        msg:'Detail inserted'
      })
    }
  })
}
else if(formData.objectId != ''){
  
    BiddingbillboardData.updateMany(
        {"_id":formData.objectId},
        {$set: formData},
        {multi:true}
    ).then((response) => {
        res.send({
            code:200,
            msg:'Billboard data updated successfully',
            content:formData
        });
    }).catch(() => res.status(422).send({msg:'something went wrong'}));
}
}

exports.getBiddingbillboard = function(req,res,next){
    BiddingbillboardData.find(function(err,data){
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
            msg:'All Bidding  billboard data',
            code:200
          })
        }
      })
}