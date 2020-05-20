const bidderBillboardBooked = require('../models/bidderBillboardBooked');




exports.postBidderBookBillboard = function (req, res, next) {
    var formData = req.body;
    if (formData.objectId == '') {
        const postBidderBillboardData = new bidderBillboardBooked({

            address: formData.address,
            bidAamount: formData.bidAamount,
            biddingBillboardId: formData.biddingBillboardId,
            billboardAvailabilityFrom: formData.billboardAvailabilityFrom,
            billboardAvailabilityTo: formData.billboardAvailabilityTo,
            billboardId: formData.billboardId,
            city: formData.city,
            companyEmail: formData.companyEmail,
            companyId: formData.companyId,
            companyLandlineNo: formData.companyLandlineNo,
            companyName: formData.companyName,
            date: formData.date,
            state: formData.state,
            time: formData.time,
            paymentStatus: formData.paymentStatus

        })

        postBidderBillboardData.save((err, data) => {
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

        bidderBillboardBooked.updateMany(
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



exports.getBidderBookebillboard = function (req, res, next) {

    bidderBillboardBooked.find(function (err, data) {
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
                msg: 'All Bidder Booked billboard data',
                code: 200
            })
        }
    })
}

exports.getspecificBookedBidderbillboard = function (req, res, next) {
    let id = req.body.id;
    bidderBillboardBooked.find({ "_id": id }, function (err, data) {
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
          msg: 'Get billboard data',
          code: 200
        })
      }
    })
  }