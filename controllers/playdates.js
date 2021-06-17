// const Owner = require('../models/owner');
// const Pet = require('../models/pet');
// const Playdate = require('../models/playdate');


module.exports = {
    index,
    new: newPlaydate,
    create
  };

  function newPlaydate(req, res){
    res.render('playdates/new');
}
function index(req, res){
    res.render('playdates/index');
}
function create(req, res){
    res.redirect('/show')
}