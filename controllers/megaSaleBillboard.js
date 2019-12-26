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
      billboardCity: formData.billboardCity,
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
