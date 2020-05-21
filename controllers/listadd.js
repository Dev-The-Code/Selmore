const listAdd = require('../models/addAgencyForm');



exports.postAddData = function(req,res,next){
  var formData = req.body;
  if(formData.objectId == ''){
  const postListData = new listAdd({
      companyId:formData.companyId,
      companyName:formData.companyName,
      images:formData.images,
      facing:formData.facing,
      category:formData.category,
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
      country:formData.country,
      bookFrom:formData.bookFrom,
      bookId:formData.bookId,

  })
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
else if(formData.objectId != ''){
  listAdd.updateMany(
        {"_id":formData.objectId},
        {$set: formData},
        {multi:true}
    ).then((response) => {
        res.send({
            code:200,
            msg:'Billboard data updated successfully',
            content:formData
        });
    }).catch(() => res.status(422).send({msg:'something went wrong'}));
}
}
