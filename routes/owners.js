var router = require('express').Router();
var ownersCtrl = require('../controllers/owners');

// GET /owmner
router.get('/', ownersCtrl.home);
router.get('/show', isLoggedIn, ownersCtrl.show);
router.get('/owners', ownersCtrl.owners)
router.get('/pets', ownersCtrl.pets)
router.get('/home', ownersCtrl.home);
router.get('/profile', ownersCtrl.profile)

// router.post('/facts', isLoggedIn, studentsCtrl.addFact);


// Authorizing the user to use a route
// probably only want to use this on
// post, put or delete routes
function isLoggedIn(req, res, next) {
	// req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware
	res.redirect('/auth/google');
}



module.exports = router;
