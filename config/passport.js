const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Owner = require('../models/owner');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) { 
    console.log(profile, "Profile Info")
    Owner.findOne({'googleId': profile.id}, function(err, owner){
      if(err) return cb(err);
      if(owner){
        return cb(null, owner)
      } else {
          const newOwner = new Owner({
             name: profile.displayName,
             email: profile.emails[0].value,
             googleId: profile.id
           })

           newOwner.save(function(err){
            if(err) return cb(err);
            return cb(null, newOwner)

           });
      }
    });
  }
));

passport.serializeUser(function(owner, done){
  done(null, owner.id); 
});


passport.deserializeUser(function(id, done){
  // Want to look up the users document by the id, from the session cookie

  Owner.findById(id, function(err, owner){
    done(err, owner);
    // setsup
    // req.user = owner
    // req.user is avialible in all controller functions throughout the entire app
  })
})



