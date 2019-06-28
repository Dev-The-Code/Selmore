const listAdd = require('../models/addAgencyForm');



exports.postAddData = function(req,res,next){
  var formData = req.body;
  const postListData = new listAdd({
      companyId:formData.companyId,
      companyName:formData.companyName,
      images:formData.images,
      facing:formData.facing,
      type:formData.type,
      size:formData.size,
      latitude:formData.latitude,
      longitude:formData.longitude,
      traffic:formData.traffic,
      width:formData.width,
      height:formData.height,
      lightning:formData.lightning,
      description:formData.description,
      status:formData.status,
      dailyRate:formData.dailyRate,
      weeklyRate:formData.weeklyRate,
      monthlyRate:formData.monthlyRate,
      yearlyRate:formData.yearlyRate,
      audianceType:formData.audianceType,
      dailyVisitor:formData.dailyVisitor,
      nearBy:formData.nearBy,
      address:formData.address,
      city:formData.city,
      state:formData.state,
      country:formData.country
  })
  console.log(postListData,'after creating object')
  postListData.save((err,data) => {
    if(err){
      res.send({
        code:404,
        content:err,
        msg:'user will not get from server some internal issue.'
      })
    }
    else if(data){
      res.send({
        code:200,
        content:data,
        msg:'Detail inserted'
      })
    }
  })
}
