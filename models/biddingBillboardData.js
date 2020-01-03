const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const biddingBillboard = new Schema({
    biddingStartDate: { type: String },
    biddingStartTime: { type: String },
    biddingEndDate: { type: String },
    biddingEndTime: { type: String },
    minBidAmount: { type: String },
    images: { type: Array },
    billboardId: { type: String },
    billboardAddress: { type: String },
    billboardCity: { type: String },
});

//model class
const ModelClass = mongoose.model('biddingBillboard', biddingBillboard);

//export model
module.exports = ModelClass;