const megaSaleBillboard = require('../models/megaSaleBillboard');



exports.postmegaSaleBillboard = function (req, res, next) {
  var formData = req.body;
  if (formData.objectId == '') {
    const postBillboardData = new megaSaleBillboard({
      actualPrice: formData.actualPrice,
      discountPrice: formData.discountPrice,
      percantageOffDisscount: formData.percantageOffDisscount,
      billboardAvailabilityFrom: formData.billboardAvailabilityFrom,
      billboardAvailabilityTo: formData.billboardAvailabilityTo,
      saleStartDate: formData.saleStartDate,
      saleStartTime: formData.saleStartTime,
      saleEndDate: formData.saleEndDate,
      saleEndTime: formData.saleEndTime,
      images: formData.images,
      billboardId: formData.billboardId,
      billboardAddress: formData.billboardAddress,
      billboardStatus: formData.billboardStatus,
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

    megaSaleBillboard.updateMany(
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


exports.getAllMegaBillBoardData = function (req, res, next) {
  megaSaleBillboard.find(function (err, data) {
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
        msg: 'All Mega Billboard data',
        code: 200
      })
    }
  })
}


exports.getspecificMegaSalebillboard = function(req, res, next){
  let id = req.body.id;
  megaSaleBillboard.find({"_id":id},function(err,data){
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

exports.deleteMegaSaleBillboard = function (req, res, next) {

  var formData = req.body;
  // megaSaleBillboard.findOneAndDelete({ "billboardId": "5d2c7d8676dc5f00176c8976" })
  // console.log("deleted")
  // BookedMegaSalebillboardData.save((err, data) => {
  //   if (err) {
  //     res.send({
  //       code: 404,
  //       content: err,
  //       msg: 'user will not get from server some internal issue.'
  //     })
  //   }
  //   else if (data) {
  //     res.send({
  //       code: 200,
  //       content: data,
  //       msg: 'Data Has been delete inserted'
  //     })
  //   }
  // })

  megaSaleBillboard.deleteOne({ "_id": formData.objectId },
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
        console.log(docs)
      }
      //  res.redirect('/view');
    });

  // BookedMegaSalebillboardData.findOneAndDelete(
  //   { "_id": formData.objectId }
  //   // { $set: formData },
  //   // { multi: true }
  // ).then((response) => {
  //   console.log(response, 'response')
  //   res.send({
  //     code: 200,
  //     msg: 'Billboard data delete successfully',
  //     content: response
  //   });
  // }).catch(() => res.status(422).send({ msg: 'something went wrong' }));

  // BookedMegaSalebillboardData.findByIdAndRemove(req.body.objectId, function (err, user) {
  //   if (err) return res.status(500).send("There was a problem deleting the user.");
  //   res.status(200).send("User: "+ user +" was deleted.");
  // });

  // BookedMegaSalebillboardData.deleteOne({
  //   _id: req.body.objectId
  // }, function(err, post){
  //   if (err)
  //     res.send(err)
  //   res.send({
  //     success: true
  //   })
  // })

}
