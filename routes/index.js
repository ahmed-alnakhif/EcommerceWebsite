var express = require('express');
var router = express.Router();
const Product = require('../models/product');



/* GET home page. */
router.get('/', function(req, res, next) {
  
  let productArray = [];
  Product.find({},(error,doc)=>{
    if(error){
      console.log(erorr)
    }else{
      
      for (let i = 0; i < doc.length; i+=3) {
        productArray.push(doc.slice(i,i+3));
      }

    }
  })
  res.render('index', { title: 'Shopping Cart', items: productArray });
});

module.exports = router;
