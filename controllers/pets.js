const Owner = require('../models/owner');
const Pet = require('../models/pet')


module.exports = {
    index,
    new: newPet,
    create
  };

  function newPet(req, res){
    res.render('pets/new');
}
function index(req, res){
    res.render('pets/index');
}
function create(req, res){
    res.redirect('/show')
}