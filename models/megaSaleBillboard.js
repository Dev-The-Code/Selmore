const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Define model
const megasalebillboard = new Schema({
    actualPrice:{type:String},
    discountPrice:{type:String},
    percantageOfDisscount:{type:String},
    billboardAvaliableStartDate:{type:String},
    billboardAvaliableEndDate:{type:String},
    saleStartDate:{type:String},
    saleStartTime:{type:String},
    saleEndDate:{type:String},
    saleEndTime:{type:String},
    bilboardDetailData:{type:String}

});

//model class
const ModelClass = mongoose.model('megasalebillboard', megasalebillboard);

//export model
module.exports = ModelClass;