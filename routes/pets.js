var router = require('express').Router();
// var ownersCtrl = require('../controllers/owner');
const petsCtrl = require('../controllers/pets')

router.get('/new', isLoggedIn, petsCtrl.new);
router.get('/', petsCtrl.index);
router.post('/', isLoggedIn, petsCtrl.create);
router.get('/:id', petsCtrl.show);
router.get('/:id/edit', isLoggedIn, petsCtrl.edit);
router.put('/:id', isLoggedIn, petsCtrl.update);


function isLoggedIn(req, res, next) {
    // req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware
	res.redirect('/auth/google');
}
module.exports = router;