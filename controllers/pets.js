const Owner = require('../models/owner');
const Pet = require('../models/pet')
const Playdate = require('../models/playdate');


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
function create(req, res){
  const pet = new Pet(req.body);
  pet.owner = req.user._id;
    pet.save(function(err) {
      res.redirect(`/pets`);
  });
};

function show(req, res) {
    Pet.findById(req.params.id)
    .populate('pet')
    .exec(function(err, pet) { 
            res.render('pets/show', { title: 'Pet Detail', pet});
          })
      };

      // <% if (user._id.equals(user && pet.owner._id)) { %>

function edit(req, res) {
  Pet.findById(req.params.id, function(err, pet) {
    // Verify  is "owned" by logged in user
    if (!pet.owner.equals(req.user._id)) return res.redirect('/pets'); 
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