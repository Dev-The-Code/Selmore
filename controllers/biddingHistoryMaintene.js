const biddingHistoryMaintene = require('../models/biddingHistoryMaintene');



exports.biddingHistory = function (req, res, next) {
  var formData = req.body;
  if (formData.objectId == '') {
    const postBillboardData = new biddingHistoryMaintene({
      bidAamount: formData.bidAamount,
      date: formData.date,
      time: formData.time,
      biddingBillboardId: formData.biddingBillboardId,
      billboardAvailabilityFrom: formData.billboardAvailabilityFrom,
      billboardAvailabilityTo: formData.billboardAvailabilityTo,
      companyName: formData.companyName,
      companyEmail: formData.companyEmail,
      companyLandlineNo: formData.companyLandlineNo,
      companyId: formData.companyId,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      billboardId: formData.billboardId,
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

    biddingHistoryMaintene.updateMany(
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

exports.getBiddingbillboardHistory = function (req, res, next) {
  biddingHistoryMaintene.find(function (err, data) {
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
        msg: 'All Booked billboard data',
        code: 200
      })
    }
  })
}

exports.getspecificBillboardBiddingHistory = function (req, res, next) {
  let id = req.body.id;
  biddingHistoryMaintene.find({ "biddingBillboardId": id }, function (err, data) {
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
        msg: 'Get billboard bidding data',
        code: 200
      })
    }
  })
}