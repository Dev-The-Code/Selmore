const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define model
const addSchema = new Schema({
billBoardImgs:{type:Array},
companyId:{type:String},
companyName:{type:String},
facing:{type:Array},
type:{type:Array},
size:{type:Array},
latitude:{type:Array},
longitude:{type:Array},
traffic:{type:Array},
});


//model class
const ModelClass = mongoose.model('addSchema',addSchema);

//export model
module.exports = ModelClass;
