var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const passport = require('passport');


/* GET users listing. */
router.get("/signup", function(req, res, next) {
  let ErrMsg = req.flash('errors')
  res.render("user/signup",{ErrorMsg:ErrMsg});
});

router.post(
  "/signup",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("email field cannot be empty!"),
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password field cannot be empty!"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password length should be at least 5 chars"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password does not match!");
      } else {
        return true;
      }
    })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let ErrorsArray = [];
      for (let i = 0; i < errors.errors.length; i++) {
        ErrorsArray.push(errors.errors[i].msg)
      }
      console.log(ErrorsArray);
      req.flash('errors',ErrorsArray);
      res.redirect('signup')
      return;
    }

    const user = new User({
      email: req.body.email,
      password: new User().hashPassword(req.body.password)
    });

    User.findOne({ email: req.body.email }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result) {
          req.flash('errors','this email is used!')
          res.redirect("/users/signup");
        } else {
          user.save((error, doc) => {
            if (error) {
              console.log(error);
            }
            console.log("doc:" + doc);
            res.redirect("/");
          });
        }
      }
    });
  }
);

router.get("/signin",(req,res,next)=>{
  res.render('user/signin');
})

router.get("/profile",(req, res, next)=>{
  console.log(req.session);
  console.log(req.user);
  res.render('user/profile')
})

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect:'profile',
  failureRedirect:'signin',
  failureFlash: true
}))



module.exports = router;
