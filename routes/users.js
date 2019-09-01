var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/user');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('user/signup')
});

router.post('/signup', 
[
  check('email').not().isEmpty().withMessage('email field cannot be empty!'),
  check('email').isEmail().withMessage('Please enter a valid email address'),
  check('password').not().isEmpty().withMessage('Password field cannot be empty!'),
  check('password').isLength({min:5}).withMessage('password length should be at least 5 chars'),
  check('confirmPassword').custom((value,{req})=>{
    if(value!==req.body.password){
      throw new Error('password does not match!')
    }
    else{
      return true;
    }
  })
]
,(req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    return;
  }

  const user = new User ({
    email: req.body.email,
    password: new User().hashPassword(req.body.password)
  })
  user.save((error,doc)=>{
    if(error){
      console.log(error);
    }
      console.log('doc:'+doc);
      res.redirect('/');
    
  })
  
})

module.exports = router;
