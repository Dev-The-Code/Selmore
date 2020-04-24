const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const biddingHistoryMaintene = new Schema({
    bidAamount: { type: String },
    date: { type: String },
    time: { type: String },
    biddingBillboardId: { type: String },
    billboardAvailabilityFrom: { type: String },
    billboardAvailabilityTo: { type: String },
    companyName: { type: String },
    companyEmail: { type: String },
    companyLandlineNo: { type: String },
    companyId: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    billboardId: { type: String },
});

//model class
const ModelClass = mongoose.model('biddingHistoryMaintene', biddingHistoryMaintene);

//export model
module.exports = ModelClass;