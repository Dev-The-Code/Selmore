const listAdd = require('../models/addAgencyForm');



exports.postAddData = function(req,res,next){
  var formData = req.body;
  const postListData = new listAdd({
      companyId:formData.companyId,
      companyName:formData.companyName,
      billBoardImgs:formData.billBoardImgs,
      facing:formData.facing,
      type:formData.type,
      size:formData.size,
      latitude:formData.latitude,
      longitude:formData.longitude,
      traffic:formData.traffic
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
        msg:'All user emails'
      })
    }
  })
}
