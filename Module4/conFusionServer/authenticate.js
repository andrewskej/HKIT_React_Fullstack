const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const User = require('./models/user'); 
const passport = require('passport');
const config = require('./config');
const FacebookTokenStrategy = require('passport-facebook-token');


exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600*24});
};
// verify admin functionality
exports.verifyAdmin = (req,res,next) =>{
    if(req.user.admin){
        next();
    }
    else{
        var err = new Error('You are not authorized!');
        err.status = 401;
        next(err);
    } 
}


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("Jwt payload : ", jwt_payload);
    User.findOne({_id : jwt_payload._id}, (err, user) => {
        if(err){
            return done(err, false);
        }
        else if (user){
            return done(null, user);
        }
        else {
            return done(null,false);
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (!err && user !== null) {
            return done(null, user);
        }
        else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            user.save((err, user) => {
                if (err)
                    return done(err, false);
                else
                    return done(null, user);
            })
        }
    });
}
));