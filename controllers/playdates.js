// const Owner = require('../models/owner');
// const Pet = require('../models/pet');
const Playdate = require('../models/playdate');
const Owner = require('../models/owner');


module.exports = {
    index,
    new: newPlaydate,
    create,
    show,
    edit,
    update
  };

  function newPlaydate(req, res){
    res.render('playdates/new');
}

function index(req, res) {
  Owner.findById(req.params.id)
  .populate('owner');
    Playdate.find({}, function (err, playdate) {
        res.render('playdates/index', { title: 'Playdates', playdate});
      })
    }

    // function create(req, res){
    //   const playdate = new Playdate.create(req.body);
    //   //assign to logged in users ID
    //   playdate.user = req.user._id;
    //   playdate.save(function(err) {
    //     if (err) return render('/playdates')// will want to make custom err template here
    //     res.redirect('/playdates/:id');
    //   });
    // }

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
    if (!Playdate.user.equals(req.user._id)) return res.redirect('/playdates');
    res.render('playdates/edit', {playdate});
  });
}

async function update(req, res){

  try{
    await Playdate.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect('/playdates')
    
  } catch(err){
    res.send(err)
  }
}

// function edit(req, res){
//   Dog.findById(req.params.id, function(err, foundDog){
//     if(err){
//       res.send(err);
//     } else {
//       res.render('edit.ejs', {
//         dog: foundDog
//       })
//     }
//   });
// }

function create(req, res){
  Playdate.create(req.body, function (err, playdate) {
    Playdate.user = req.user._id;
    Playdate.save;
  res.redirect('/playdates')
  console.log(req.body)
  });
};