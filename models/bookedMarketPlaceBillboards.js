const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const bookMarketPlaceBillboard = new Schema({
    companyName: { type: String },
    companyId: { type: String },
    companyEmail: { type: String },
    companyLandlineNo: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    billboardId: { type: String },
    bookedDays: { type: String },
    selectDays: { type: String },
    dateRange: { type: Array },
    amountCharge: { type: Number },
    paymentStatus :{type :String}
});

//model class
const ModelClass = mongoose.model('bookMarketPlaceBillboard', bookMarketPlaceBillboard);

//export model
module.exports = ModelClass;