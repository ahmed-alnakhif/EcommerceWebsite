const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ECommerce',{seNewUrlParser:true},(error)=>{
  if(error){
    console.log(error)
  }
  else{
    console.log('connected to Database')
  }
})

//instance of the schema 
const products = [
    new Product({
        imagePath:'/images/Porsche-Mission-E-Concept-car.jpg',
        productName:'Porsche Mission',
        price:120000,
        info:{
            year:2019,
            make:'Porsche',
            model:'Mission-E',
            carType:'Coupe',
        },
    }),
    new Product({
        imagePath:'/images/2019-Mercedes-Benz-A-CLASS-on-street.jpg',
        productName:'Mercedes Benz A-Class',
        price:30000,
        info:{
            year:2019,
            make:'Mercedes',
            model:'A-Class',
            carType:'Sedan',
        },
    }),
    new Product({
        imagePath:'/images/MBW520.jpg',
        productName:'MBW 520',
        price:120000,
        info:{
            year:2019,
            make:'BMW',
            model:'520',
            carType:'Sedan',
        },
    }),
    new Product({
        imagePath:'/images/NissanMaxima.jpg',
        productName:'Nissan Maxima',
        price:22000,
        info:{
            year:2018,
            make:'Nissan',
            model:'Maxima',
            carType:'Sedan',
        },
    })
]

//push products to DB
let done=0;
for(let i=0; i<products.length;i++){
    products[i].save((error,result)=>{
        if(error){
            console.log(error)
        }
        console.log(result);
        done++;
        if(done===products.length){
            mongoose.disconnect()
        }
    })
}
