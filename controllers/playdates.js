// const Owner = require('../models/owner');
// const Pet = require('../models/pet');
const Playdate = require('../models/playdate');
const Owner = require('../models/owner');
const Pet = require('../models/pet');
// const owner = require('../models/owner');


module.exports = {
    index,
    new: newPlaydate,
    create,
    show,
    edit,
    update,
    delete: deletePlaydate,
    addToPlaydate,
    remove
  };

  function newPlaydate(req, res){
    Pet.find({ owner: req.user._id}, function(err, pets){
    res.render('playdates/new', {pets});
    })
  }

function index(req, res) {
    Playdate.find({}, function (err, playdate) {
        res.render('playdates/index', { title: 'Playdates', playdate});
      })
    }

function show(req, res) {
  Playdate.findById(req.params.id)
  .populate('owner').populate('pet').populate('petsOnPlaydate')
  .exec(function(err, playdate) { 
            Pet.find(
              // let playDatePet = JSON.parse(body);
              { owner: req.user._id}, 
              function(err, pets){
              res.render('playdates/show', { title: 'Playdate Detail', playdate, pets});
          })
        })
      };



function edit(req, res) {
  Playdate.findById(req.params.id, function(err, playdate) {
    // Verify book is "owned" by logged in user
    if (!playdate.owner.equals(req.user._id)) return res.redirect('/playdates');
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


function create(req, res){
  // Pet.find({ owner: req.user._id});
    const playdate = new Playdate(req.body);
    playdate.owner = req.user._id;
      playdate.save(function(err) {
        res.redirect(`/playdates`);
    });
  };
  // };

function deletePlaydate(req, res){
  Playdate.findByIdAndRemove(req.params.id, (err, deletePlaydate) => {
    res.redirect('/playdates')
  })
}

function addToPlaydate(req, res) {
  Playdate.findById(req.params.id, function(err, playdate) {
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    // Pet.findById(req.body.pet, function(err, pet) {
      //     console.log(req.body, '<--what im tryin to log') 
      playdate.petsOnPlaydate.push(req.body.pet);
      console.log(req.body.pet, '<___________ MORE STUFF to loK At')
      console.log('WE BE DOIN THINGS *!*@*@!(#$!#@)($%!#)$*%#@$%')
      playdate.save(function(err) {
        res.redirect(`/playdates/${playdate._id}`);
      });
    });
  // })
}

function remove(req, res){
 console.log('hello!')
}