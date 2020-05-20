const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const bookedMegaSaleBillboards = new Schema({
    companyName: { type: String },
    companyEmail: { type: String },
    companyId: { type: String },
    companyLandlineNo: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    billboardId: { type: String },
    bookedDate: { type: String },
    billboardAmount: { type: Number },
    paymentStatus: { type: String }
});

//model class
const ModelClass = mongoose.model('bookedMegaSaleBillboards', bookedMegaSaleBillboards);

//export model
module.exports = ModelClass;