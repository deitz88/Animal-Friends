const Owner = require('../models/owner');
const Pet = require('../models/pet');
const Playdate = require('../models/playdate');

module.exports = {
  owners,
  show, 
  home,
  pets,
  profile,
  edit,
  update, 
  test
};


function owners(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  Owner.find(modelQuery)
  .sort(sortKey).exec(function(err, owners) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('owners/owners', {
      owners,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}
function home(req, res, next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  Owner.find(modelQuery)
  .sort(sortKey).exec(function(err, owners) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('owners/home', {
      owners,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}
function pets(req, res, next) {
    res.render('owners/pets', {
    });
}
function profile(req, res, next) {
  Owner.findById(req.params.id)
  .populate('owner')
  .exec(function(err, owner) { 
           res.render('owners/profile', { title: 'Owner Profile', owner});
    })
  }

  function show(req, res){
    Owner.findById(req.user._id)
    .exec(function(err, owner) { 
      Playdate.find({ owner: req.user._id}, function(err, playdates){
        Pet.find(
          { owner: req.user._id}, 
          function(err, pets){
          
          if(err) console.error(err);
          res.render('owners/show', {playdates, pets, owner});
      });
    });
  });
    }


// function show(req, res){
//   // Owner.findById(req.user._id, function(err, owner){
//   //   if(err) console.error(err);
//   //   console.log(owner);
//     Playdate.find({ owner: req.user._id}, function(err, playdates){
//       if(err) console.error(err);
//       res.render('owners/show', {playdates});
//     });
//   // });
//

// function edit(req, res, next) {
//   console.log(req.user._id, '<-----THIS THIBGASDFKELBGSDFGHSPFDG')
//   Owner.findById(req.user._id)
//   .populate('name', 'avatar', 'email')
//   .exec(function(err, owner) { 
//            res.render('owners/edit', { title: 'Edit Profile', owner});
//     })
//   }


  function edit(req, res){
    Owner.findById(req.user._id, function(err, owner){
        if(err) console.error(err);
        res.render('owners/edit', {owner});
    });
  // });
};

async function update(req, res){

  try{
    await Owner.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect('/show')
    
  } catch(err){
    res.send(err)
  }
}

function test(req, res, next) {
  res.render('owners/test', {
  });
}