var router = require('express').Router();
// var ownersCtrl = require('../controllers/owner');
// const petsCtrl = require('../controllers/pets');
const playdatesCtrl = require('../controllers/playdates');


router.get('/', playdatesCtrl.index);
router.get('/new', playdatesCtrl.new);
router.post('/', playdatesCtrl.create);






module.exports = router;