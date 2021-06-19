// const Owner = require('../models/owner');
// const Pet = require('../models/pet');
const Playdate = require('../models/playdate');


module.exports = {
    index,
    new: newPlaydate,
    create,
    show,
    edit
  };

  function newPlaydate(req, res){
    res.render('playdates/new');
}

function index(req, res) {
    Playdate.find({}, function (err, playdate) {
        res.render('playdates/index', { title: 'Playdates', playdate});
      })
    }

    function create(req, res){
      const playdate = new Playdate(req.body);
      //assign to logged in users ID
      playdate.user = req.user._id;
      playdate.save(function(err) {
        if (err) return render('/playdates')// will want to make custom err template here
        res.redirect('/playdates/:id');
      });
    }

function show(req, res) {
    Playdate.findById(req.params.id)
          .populate('playdate')
          .exec(function(err, playdate) { 
            res.render('playdates/show', { title: 'Playdate Detail', playdate});
            console.log(req.body)
          })
      };

function edit(req, res) {
  Playdate.findById(req.params.id, function(err, playdate) {
    // Verify book is "owned" by logged in user
    if (!playdate.user.equals(req.user._id)) return res.redirect('/playdates');
    res.render('playdates/edit', {playdate});
  });
}