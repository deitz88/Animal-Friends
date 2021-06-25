var router = require('express').Router();
const multer  = require('multer')
const petsCtrl = require('../controllers/pets')
var path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
	  console.log(file);
	  cb(null, Date.now() + path.extname(file.originalname));
	}
  });
  const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
	  cb(null, true);
	} else {
	  cb(null, false);
	}
  }
  
const upload = multer({ storage: storage, fileFilter: fileFilter, dest: 'uploads/'  });

router.get('/new', isLoggedIn, petsCtrl.new);
router.get('/', petsCtrl.index);
router.get('/roulette', isLoggedIn, petsCtrl.roulette);
router.get('/:id', isLoggedIn, petsCtrl.show);
router.delete('/:id', isLoggedIn, petsCtrl.delete);
router.get('/:id/edit', isLoggedIn, petsCtrl.edit);
router.put('/:id', isLoggedIn, upload.single('petImage'), petsCtrl.update);
router.post('/', isLoggedIn, upload.single('petImage'), petsCtrl.create)
router.get('/:id/images', petsCtrl.image)
router.get('/:id/imagesSrc', petsCtrl.imageSrc)
router.get('/:id/imagesPlaydate', petsCtrl.imagePlaydate)



function isLoggedIn(req, res, next) {
	if ( req.isAuthenticated() ) return next(); 
	res.redirect('/auth/google');
}
module.exports = router;