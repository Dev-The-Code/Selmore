const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  companyName: { type: String },
  randomno: { type: String },
  mobileNo: { type: String },
  landlineNo: { type: String },
  role: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: String },
  userStatus: { type: String },
});

//on Save Hook, encrypt password
//Berfore saving modal run this code
userSchema.pre('save', function (next) {
  //gett access to the user model
  const user = this;
  //generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    //hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err); }
      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    })
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  })
}


//model class
const ModelClass = mongoose.model('user', userSchema);

//export model
module.exports = ModelClass;
