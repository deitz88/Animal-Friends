const Owner = require('../models/owner');
const Pet = require('../models/pet');
const Playdate = require('../models/playdate');

module.exports = {
  owners,
  show, 
  home,
  pets,
  profile
};


function owners(req, res, next) {
  console.log(req.query)
  console.log(req.user)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
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
  console.log(req.query)
  console.log(req.user)
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
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
  // console.log(req.query)
  // console.log(req.user)
  // // Make the query object to use with Student.find based up
  // // the user has submitted the search form or now
  // let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // // Default to sorting by name
  // let sortKey = req.query.sort || 'name';
  // Pet.find(modelQuery)
  // .sort(sortKey).exec(function(err, pets) {
  //   if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('owners/pets', {
      // pets,
      // user: req.user,
      // name: req.query.name,
      // sortKey
    });
  // });
}
function profile(req, res, next) {
  Owner.findById(req.params.id)
  .populate('owner')
  .exec(function(err, owner) { 
           res.render('owners/profile', { title: 'Owner Profile', owner});
    })
  }

  function show(req, res){
      Playdate.find({ owner: req.user._id}, function(err, playdates){
        Pet.find(
          { owner: req.user._id}, 
          function(err, pets){
          
          if(err) console.error(err);
          res.render('owners/show', {playdates, pets});
      });
    });
  };


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