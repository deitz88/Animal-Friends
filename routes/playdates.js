var router = require('express').Router();
// var ownersCtrl = require('../controllers/owner');
// const petsCtrl = require('../controllers/pets');
const playdatesCtrl = require('../controllers/playdates');


router.get('/', playdatesCtrl.index);
router.get('/new', isLoggedIn, playdatesCtrl.new);
router.post('/', isLoggedIn,  playdatesCtrl.create);
router.get('/:id', isLoggedIn, playdatesCtrl.show);
router.get('/:id/edit', isLoggedIn, playdatesCtrl.edit);
router.put('/:id', isLoggedIn, playdatesCtrl.update);
router.delete('/:id', isLoggedIn, playdatesCtrl.delete);
router.post('/:id/add', isLoggedIn,  playdatesCtrl.addToPlaydate);
router.delete('/:playdateId/:petId/remove', isLoggedIn, playdatesCtrl.remove);


function isLoggedIn(req, res, next) {
	// req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware
	res.redirect('/auth/google');
}




module.exports = router;