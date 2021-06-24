const Owner = require('../models/owner');
const Pet = require('../models/pet')
const Playdate = require('../models/playdate');


module.exports = {
    index,
    new: newPet,
    create,
    show,
    edit,
    delete: deletePet,
    update,
    image,
    closeImg
  };

  function newPet(req, res){
    res.render('pets/new');
}
function index(req, res) {
    Pet.find({}, function (err, pet) {
        res.render('pets/index', { title: 'Pets', pet});
      })
    }

function show(req, res) {
    Pet.findById(req.params.id)
    .populate('pet')
    .exec(function(err, pet) { 
            res.render('pets/show', { title: 'Pet Detail', pet});
          })
      };

function edit(req, res) {
  Pet.findById(req.params.id, function(err, pet) {
    // Verify  is "owned" by logged in user
    if (!pet.owner.equals(req.user._id)) return res.redirect('/pets'); 
    //add redirect to specific must be owner of thie material after
    res.render('pets/edit', {pet});
  });
}

function deletePet(req, res){
  Pet.findByIdAndRemove(req.params.id, (err, deletePet) => {
    res.redirect('/show')
  })
}


async function update(req, res){

  try{
    await Pet.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect('/show')
    
  } catch(err){
    res.send(err)
  }
}

  function create(req, res){
    console.log(req.body)
    if (!req.file) {
      const pet = new Pet(req.body);
      pet.owner = req.user._id;   
      pet.save(function(err) {
        res.redirect(`/pets`);
    
      });
  
    } else {
    const pet = new Pet(req.body);
    pet.owner = req.user._id;   
    pet.petImage = req.file.path
    pet.save(function(err) {
            res.redirect(`/pets`);
  });
  }
}

function image(req, res){
  Pet.findById(req.params.id, function(err, pet) {
    res.render('pets/imgShow', {pet});
  })
}

function closeImg(req, res){
  res.redirect(res.redirect('/show'))
}