const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session:false });
const requireSignin = passport.authenticate('local', {session:false});
const listAgencyForm = require('./controllers/listadd');
const getAllBillboard = require('./controllers/getallbillboard');
module.exports = function(app){

  //post routes
//app.post('/signin',requireSignin,  Authentication.signin);
app.post('/signup',Authentication.signup);
app.post('/signin',requireSignin, Authentication.signin);
app.post('/listadd',listAgencyForm.postAddData);
//get routes

app.get('/getemails',Authentication.getemails);
app.get('/getcompanyname',Authentication.getcompanyname);
app.get('/getbillboard',getAllBillboard.getBillboard)
  //app.get('/getprofile',requireAuth, getprofile.getProfile)
}
