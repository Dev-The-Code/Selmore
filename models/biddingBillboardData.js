const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const biddingBillboard = new Schema({
    billboardAvailabilityFrom: { type: String },
    billboardAvailabilityTo: { type: String },
    biddingStartDate: { type: String },
    biddingStartTime: { type: String },
    biddingEndDate: { type: String },
    biddingEndTime: { type: String },
    minBidAmount: { type: String },
    images: { type: Array },
    billboardId: { type: String },
    billboardAddress: { type: String },
    billboardType: { type: String },
    billboardFacing: { type: String },
    billboardLighting: { type: String },
    billboardAudienceType: { type: String },
    billboardCity: { type: String },
    billboardState: { type: String },
});

//model class
const ModelClass = mongoose.model('biddingBillboard', biddingBillboard);

//export model
module.exports = ModelClass;