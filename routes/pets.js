var router = require('express').Router();
// var ownersCtrl = require('../controllers/owner');
const petsCtrl = require('../controllers/pets')

router.get('/new', petsCtrl.new);
router.get('/', petsCtrl.index)
router.post('/', petsCtrl.create);

module.exports = router;