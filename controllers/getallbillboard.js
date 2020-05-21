const listAdd = require('../models/addAgencyForm');


exports.getBillboard = function(req, res, next){
listAdd.find(function(err,data){
  if(err){
    res.send({
      msg:'Error getting billboard',
      code:404,
      err:err
    })
  }
  else if(data){
    res.send({
      content:data,
      msg:'All billboard data',
      code:200
    })
  }
})
}

exports.getspecificBillboard = function(req, res, next){
  let id = req.body.id;
  listAdd.find({"_id":id},function(err,data){
    if(err){
      res.send({
        msg:'Error getting billboard',
        code:404,
        err:err
      })
    }
    else if(data){
      res.send({
        content:data,
        msg:'Get billboard data',
        code:200
      })
    }
  })
  }