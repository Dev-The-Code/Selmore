const jwt = require('jwt-simple');
const User = require('../models/user');
const moment = require('moment');
const crypto = require('crypto');
const config = require('../config/config');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

//creting token for user or through user.id
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

function tokenForSocialUser(usersocial) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: usersocial.userId, iat: timestamp }, config.secret);
}

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "drens224@gmail.com",
    pass: "drent1234"
  },
  tls: {
    rejectUnauthorized: false
  }

});

exports.signin = function (req, res, next) {
  //user has already had their email and password auth'd
  //we just need to give them a token
  var user = req.body.email;
  User.findOne({ email: user }, function (err, user) {
    console.log(user);
    if (user.userStatus == 'approved') {
      //var username = user.firstname +''+ user.lastname;
      res.send({
        token: tokenForUser(req.user),
        _id: req.user.id,
        email: req.user.email,
        code: 200,
        companyName: user.companyName,
        role: user.role,
        landlineNo: user.landlineNo,
        mobileNo: user.mobileNo,
        userStatus: user.userStatus
      });
    }
    else {
      res.send({
        code: 400,
        msg: 'Your are not approved user kindly contact admin or system administrator of selmore.com'
      })
    }
  })
}


exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;
  // const contactNo = req.body.contactNo;
  const mobileNo = req.body.mobileNo;
  const landlineNo = req.body.landlineNo;
  // const fullName  = req.body.fullName;
  // const type = req.body.type;
  const role = req.body.role;
  const companyName = req.body.companyName;
  const userStatus = "pending";
  // const RoleAsBuyer = req.body.RoleAsBuyer;


  if (!email || !password) {
    return res.status(422).send({ error: 'you must provide email and password' })
  }

  //see if a user given email exist show error
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }
    //if a user with email does exit, return a error
    if (existingUser) {
      return res.status(422).send({ error: 'Email in use' });
    }
    //if a user with email does not exit, create and save user
    rand = Math.floor((Math.random() * 100) + 54);
    const user = new User({
      email: email,
      password: password,
      landlineNo: landlineNo,
      mobileNo: mobileNo,
      randomno: rand,
      companyName: companyName,
      userStatus: userStatus,
      role: role

    });
    user.save(function (err) {
      if (err) { return next(err); }
    });
    //=========user email send to perticular client start=============//

    host = req.get('host');
    link = req.protocol + "://" + req.get('host') + "/verify?email=" + email + "&&id=" + rand;
    //   mailOptions={
    //     to : email,
    //     subject : "Please confirm your Email account",
    //     html : `<html style="opacity: 1;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;box-sizing: border-box;border: solid;"><head><title>Verify your Email Address</title></head><body style="width: 100% !important;height: 100%;margin: 0;line-height: 1.4;background-color: #F5F7F9;color: #555555;"><div class="email-di" style=" width:480px;margin:0 auto;padding:30px;"><table class="email" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;margin: 0;padding: 0;background-color: #FFFFFF;"><tr><td align="center" style="border: 1px groove;color: grey"><table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;margin: 0;padding: 0;"><tr><td><img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1552902878/Drent-logo-white_hmbw7i.png" style="display: block;margin-left: auto;margin-right: auto;width:30%;height:30%"></td> </tr> <tr><td class="email-body" width="100%" style="width: 100%;margin: 0;padding: 0;border-top: 1px solid #FFFFFF;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="width: 570px;margin: 0 auto;padding: 0;"><tr><td class="content" style="padding: 35px;"><h1 style="margin-top: 0;color:#292E31;font-size: 19px;font-weight: bold;text-align: left;">Verify your email address</h1><p style="margin-top: 0;color: #555555;font-size: 16px;line-height: 1.5em;text-align: left;">Welcome to Drent! Please confirm your email account by clicking the button below</p><table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" style=" width: 100%;margin: 30px auto;padding: 0;text-align: center;"><tr><td align="center"><div> <a href="${link}" class="button button--blue" style="background-color: #8cbc40; display: inline-block;width: 200px;border-radius: 3px;color: #ffffff;font-size: 15px;line-height: 45px;text-align: center;text-decoration: underline;cursor:pointer;">Verify Email</a></div></td> </tr><p style="margin-top: 0;color: #555555;font-size: 16px;line-height: 1.5em;text-align: left;">Team Drent<br></p><tr><td>
    //                         <ul style="list-style-type: none;text-align: center;">
    //                             <li style="float: left;"><a href="#"><p style="align-content: left"><img class="social-icon" src="http://i.imgur.com/oyXO6zq.png" width="30" height="30"></p></a></li>
    //                             <li style="float: left;"><a href="#"><p class="text-center"><img class="social-icon" src="http://i.imgur.com/AJNmSZs.png" width="30" height="30"></p></a><li>
    //                             <li style="float: left;"><a href="#"><p class="text-center"><img class="social-icon" src="http://i.imgur.com/GLEVM7N.png" width="30" height="30"></p></a><li>
    //                       </ul>
    //                         </td>
    //                         </tr>
    //                         </table>
    //                      <table class="body-sub" style="margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;">
    //                       <tr>
    //                         <td>
    //                           <p class="sub" style="font-size: 12px;">Something not working? Please write to us at support@drent.com.
    //                           </p>
    //                         </td>
    //                       </tr>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </table>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td>
    //               <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="width: 570px;margin: 0 auto;padding: 0;text-align: center;">
    //                 <tr>
    //                   <td class="content-cell">
    //                     <p class="sub center" style="text-align:center;">
    //                      <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1552902878/Drent-logo-white_hmbw7i.png" style="display: block;margin-left: auto;margin-right: auto;width:30%;height:30%" />
    //                       <br>
    //                     </p>
    //                   </td>
    //                 </tr>
    //               </table>
    //             </td>
    //           </tr>
    //         </table>
    //       </td>
    //     </tr>
    //   </table>
    // </div>
    // </body>
    // </html>`
    //
    //   }
    //   console.log(mailOptions);
    //   smtpTransport.sendMail(mailOptions, function(error, response){
    //      if(error){
    //           console.log(error);
    //     res.end("error");
    //    }else{
    //           console.log("Message sent: " + response.message);
    //           console.log("Message sent: " + response.message);
    //           res.end("sent");
    //        }
    // });


    //========user email send to perticular client end===============//

    //Respond to request indicating user was created
    res.json({
      token: tokenForUser(user),
      _id: user._id,
      code: 200
    });
  });
}
exports.getemails = function (req, res, next) {
  User.find(function (err, data) {
    if (err) {
      res.send({
        code: 404,
        content: err,
        msg: 'user will not get from server some internal issue.'
      })
    }
    else if (data) {
      const userEmails = [];
      for (var i = 0; i < data.length; i++) {
        userEmails.push(data[i].email)
      }
      res.send({
        code: 200,
        content: userEmails,
        msg: 'All user emails'
      })
    }
  })
}
exports.getcompanyname = function (req, res, next) {
  User.find(function (err, companyname) {
    if (err) {
      res.send({
        code: 404,
        content: err,
        msg: 'user will not get from server some internal issue.'
      })
    }
    else if (companyname) {
      const comnpanynames = [];
      for (var i = 0; i < companyname.length; i++) {
        comnpanynames.push({
          companyName: companyname[i].companyName,
          _id: companyname[i]._id
        })
      }
      res.send({
        code: 200,
        content: comnpanynames,
        msg: 'All user emails'
      })
    }
  })
}


exports.getAllUsers = function (req, res, next) {
  User.find(function (err, allUsers) {
    if (err) {
      res.send({
        code: 404,
        content: err,
        msg: 'user will not get from server some internal issue.'
      })
    }
    else if (allUsers) {
      //const comnpanynames = [];
      var userData = allUsers;
      for (let key in userData) {
        delete userData[key].password;
        //delete allUsers[key].type;
      }
      res.send({
        code: 200,
        content: userData,
        msg: 'All user including approved, pending and blocked'
      })
    }
  })
}

exports.changeStatus = function (req, res, next) {
  const id = req.body.id;
  const userStatus = req.body.userStatus;
  User.update(
    { _id: id },
    {
      $set: {
        userStatus: userStatus
      }
    }
  ).then((response) => {
    res.send({
      code: 200,
      msg: 'Status updated successfully',
      content: response
    });
  }).catch(() => res.status(422).send({ msg: 'something went wrong' }));
}