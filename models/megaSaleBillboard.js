const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const megasalebillboard = new Schema({
    actualPrice: { type: String },
    discountPrice: { type: String },
    percantageOffDisscount: { type: Number },
    billboardAvailabilityFrom: { type: String },
    billboardAvailabilityTo: { type: String },
    saleStartDate: { type: String },
    saleStartTime: { type: String },
    saleEndDate: { type: String },
    saleEndTime: { type: String },
    images: { type: Array },
    billboardId: { type: String },
    billboardAddress: { type: String },
    billboardCity: { type: String },
    billboardStatus: { type: String },
});

//model class
const ModelClass = mongoose.model('megasalebillboard', megasalebillboard);

//export model
module.exports = ModelClass;