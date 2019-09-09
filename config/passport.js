const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done)=>{
    return done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id, ('email'), (err, user)=>{
        return done(err, user);
    })
})

passport.use('local-signin', new localStrategy({
    //strategy
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true,

}, (req, email, password, done)=>{
     User.findOne({email:email},(error,user)=>{
         if(error){
             return done(error,false)
         }
         else{
            if(!user){
                return done(null,false,req.flash('signinError','User not found!'))
            }else{
                if(!user.comparePassword(password)){
                    return done(null, false, req.flash('signinError','Worng password!'))
                }
                else{
                    return done(null,user);
                }
            }
         }
     })
}))
