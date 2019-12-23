const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const biddingBillboard = new Schema({
    minimumBidAmount:{type:String},
    billboardAmount:{type:String},
    biddingStartDate:{type:String},
    biddingStartTime:{type:String},
    biddingEndDate:{type:String},
    biddingEndTime:{type:String},
    bilboardDetailData:{type:String}
});

//model class
const ModelClass = mongoose.model('biddingBillboard', biddingBillboard);

//export model
module.exports = ModelClass;