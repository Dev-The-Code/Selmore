const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define model
const addSchema = new Schema({
<<<<<<< HEAD
billBoardImgs:{type:String},
companyId:{type:String},
companyName:{type:String},
facing:{type:Array},
type:{type:Array},
size:{type:Array},
latitude:{type:Array},
longitude:{type:Array},
traffic:{type:Array},
width:{type:Array},
height:{type:Array},
lightning:{type:Array},
description:{type:Array},
status:{type:Array},
dailyRate:{type:Array},
monthlyRate:{type:Array},
weeklyRate:{type:Array},
monthlyRate:{type:Array},
yearlyRate:{type:Array},
audianceType:{type:Array},
dailyVisitor:{type:Array},
nearBy:{type:Array},
address:{type:Array},
city:{type:Array},
state:{type:Array},
country:{type:Array},
=======
    images: { type: Array },
    companyId: { type: String },
    companyName: { type: String },
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
>>>>>>> 83d36e2005d852d99cefa72d623fd03289739461

});


//model class
const ModelClass = mongoose.model('addSchema', addSchema);

//export model
module.exports = ModelClass;
