const BookedbillboardData = require('../models/bookedMarketPlaceBillboards');



exports.postBookedBillboard = function(req,res,next){
  var formData = req.body;
  if(formData.objectId == ''){
  const postBillboardData = new BookedbillboardData({
    companyName:formData.companyName,
    companyId:formData.companyId,
    companyEmail:formData.companyEmail,
    companyLandlineNo:formData.companyLandlineNo,
    address:formData.address,
    city:formData.city,
    state:formData.state,
    billboardId:formData.billboardId,
    bookedDays:formData.bookedDays,
    selectDays:formData.selectDays,
    dateRange:formData.dateRange,
    amountCharge:formData.amountCharge,
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
  
    BookedbillboardData.updateMany(
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

exports.getBookedbillboard = function(req,res,next){
    BookedbillboardData.find(function(err,data){
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
            msg:'All Booked billboard data',
            code:200
          })
        }
      })
}