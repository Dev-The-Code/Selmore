const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define model
const addSchema = new Schema({
    billBoardImgs: { type: String },
    images: { type: Array },
    companyId: { type: String },
    companyName: { type: String },
    category: { type: Array },
    facing: { type: String },
    type: { type: String },
    size: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    traffic: { type: String },
    width: { type: String },
    height: { type: String },
    lightning: { type: String },
    description: { type: String },
    status: { type: String },
    dailyRate: { type: String },
    monthlyRate: { type: String },
    weeklyRate: { type: String },
    monthlyRate: { type: String },
    yearlyRate: { type: String },
    audianceType: { type: String },
    dailyVisitor: { type: String },
    nearBy: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    avalibleOn: { type: String },
    avalibleOnId: { type: String },
    bookFrom: { type: String },
    bookId: { type: String }
});


//model class
const ModelClass = mongoose.model('addSchema', addSchema);

//export model
module.exports = ModelClass;