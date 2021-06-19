var router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res){

  res.redirect('/owners')
})
router.get('/owners', function(req, res) {
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/home', // where do you want the client to go after you login 
    failureRedirect : '/home' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/owners');
});

// router.get('/pets', function(req, res){

//   res.redirect('/pets')
// })


module.exports = router;
