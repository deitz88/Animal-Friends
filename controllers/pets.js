const Owner = require('../models/owner');
const Pet = require('../models/pet')


module.exports = {
    index,
    new: newPet,
    create,
    show,
    edit,
    update
  };

  function newPet(req, res){
    res.render('pets/new');
}
function index(req, res) {
    Pet.find({}, function (err, pet) {
        res.render('pets/index', { title: 'Pets', pet});
      })
    }

// function create(req, res){
//   const pet = new Pet(req.body);
//   //assign book to logged in users ID
//   pet.user = req.user._id;
//   pet.save(function(err) {
//     if (err) return render('/pets')// will want to make custom err template here
//     res.redirect('/pets/:id');
//   });
// }

function create(req, res){
  Pet.create(req.body, function (err, pet) {
    Pet.user = req.user._id;
    Pet.save;
  res.redirect('/pets')
  console.log(req.body)
  });
};


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
    // Verify  is "owned" by logged in user
    if (!Pet.user.equals(req.user._id)) return res.redirect('/pets'); 
    //add redirect to specific must be owner of thie material after
    res.render('pets/edit', {pet});
  });
}
async function update(req, res){

  try{
    await Pet.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect('/pets/:id')
    
  } catch(err){
    res.send(err)
  }
}