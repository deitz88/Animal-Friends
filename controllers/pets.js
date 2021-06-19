const Owner = require('../models/owner');
const Pet = require('../models/pet')


module.exports = {
    index,
    new: newPet,
    create,
    show
  };

  function newPet(req, res){
    res.render('pets/new');
}
function index(req, res) {
    Pet.find({}, function (err, pet) {
        res.render('pets/index', { title: 'Pets', pet});
      })
    }

function create(req, res){
  const pet = new Pet(req.body);
  //assign book to logged in users ID
  pet.user = req.user._id;
  pet.save(function(err) {
    if (err) return render('/pets')// will want to make custom err template here
    res.redirect('/pets/:id');
  });
}



// function create(req, res){
//     Pet.create(req.body, function (err, pet) {
//     res.redirect('/show')
//     console.log(req.body)
//     })
// }
function show(req, res) {
    Pet.findById(req.params.id)
    .populate('pet')
    .exec(function(err, pet) { 
              console.log(pet)
            res.render('pets/show', { title: 'Pet Detail', pet});
          })
      };

function edit(req, res) {
  Pet.findById(req.params.id, function(err, pet) {
    // Verify book is "owned" by logged in user
    if (!pet.user.equals(req.user._id)) return res.redirect('/pets');
    res.render('pets/edit', {pet});
  });
}