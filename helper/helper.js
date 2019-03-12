const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {users} = require('../models')
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'you_jwt_secret';
// console.log(opts)

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await  users.findOne({where : {email: jwt_payload.email}})
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (error) {
        
            return done(error, false);
        

    }
   
        
    }
))


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    users.findById(id, function(err, user) {
      done(err, user);
    });
  });

  module.exports = passport
