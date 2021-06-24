var router = require('express').Router();
// var ownersCtrl = require('../controllers/owner');
const multer  = require('multer')
const petsCtrl = require('../controllers/pets')
const upload = multer({ dest: 'uploads/' })

router.get('/new', isLoggedIn, petsCtrl.new);
router.get('/', petsCtrl.index);
// router.post('/', isLoggedIn, petsCtrl.create);
router.get('/:id', petsCtrl.show);
router.delete('/:id', isLoggedIn, petsCtrl.delete);
router.get('/:id/edit', isLoggedIn, petsCtrl.edit);
router.put('/:id', isLoggedIn, petsCtrl.update);
router.post('/', isLoggedIn, upload.single('petImage'), petsCtrl.create)



function isLoggedIn(req, res, next) {
    // req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware
	res.redirect('/auth/google');
}
module.exports = router;