const Owner = require('../models/owner');
const Pet = require('../models/pet')
const Playdate = require('../models/playdate');
var path = require('path');
// const fs = require('fs')



module.exports = {
    index,
    new: newPet,
    create,
    show,
    edit,
    delete: deletePet,
    update,
    image,
    imageSrc,
    imagePlaydate,
    roulette
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
            console.log(pet.petImage.path, '<-----')
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


// function deletePet(req, res){
//   const pet = Pet.findById(req.params.id);
  
//   (delPet.petImage._id).exec(function(err, pet) {
//     Pet.findByIdAndRemove(pet, function(err, deletePet) {
//         res.redirect('/show')
//       })
//     })
// }


async function update(req, res){

  try{

    if(!req.file){
      await Pet.findByIdAndUpdate(req.params.id, req.body, {new: true}), 
      Pet.petImage = 'noImage';
      res.redirect('/show');

      } else{
        await Pet.findByIdAndUpdate(req.params.id, req.body, {new: true})
          res.redirect('/show')
      }
  }catch(err){
    // res.send(err)
  }
}


  function create(req, res){
    console.log(req.body)
    if (!req.file) {
      const pet = new Pet(req.body);
      pet.owner = req.user._id;   
      pet.petImage = 'noImage'
      pet.save(function(err) {
        res.redirect(`../show`);
    
      });
  
    } else {
    const pet = new Pet(req.body);
    pet.owner = req.user._id;   
    pet.petImage = req.file.path
    pet.save(function(err) {
            res.redirect(`../show`);
  });
  }
}

function image(req, res){
  Pet.findById(req.params.id, function(err, pet) {
    res.render('pets/imgShow', {pet});
  })
}

function imageSrc(req, res){
  Pet.findById(req.params.id, function(err, pet) {
    res.render('pets/imgShowSrc', {pet});
  })
}
function imagePlaydate(req, res){
  Pet.findById(req.params.id, function(err, pet) {
    res.render('pets/imgShowPlaydate', {pet});
  })
}

function roulette (req, res){
    res.render('pets/roulette');
}