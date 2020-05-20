const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const bidderBillboardBooked = new Schema({
    address: { type: String },
    bidAamount: { type: String },
    biddingBillboardId: { type: String },
    billboardAvailabilityFrom: { type: String },
    billboardAvailabilityTo: { type: String },
    billboardId: { type: String },
    city: { type: String },
    companyEmail: { type: String },
    companyId: { type: String },
    companyLandlineNo: { type: String },
    companyName: { type: String },
    date: { type: String },
    state: { type: String },
    time: { type: String },
    paymentStatus: { type: String }

});

//model class
const ModelClass = mongoose.model('bidderBillboardBooked', bidderBillboardBooked);

//export model
module.exports = ModelClass;