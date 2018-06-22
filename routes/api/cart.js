const Cart = require('../../db').Cart
const Product = require ('../../db').Product
const route = require('express').Router();

route.get('/', (req, res) => {
    // Get all cartItems
    Cart.findAll()
        .then((cartItems) => {
            res.status(200).send(cartItems)
        })
        .catch((err) => {
            res.status(500).send({
                error: "Could not retrieve cartItems"
            })
        })
})

route.post('/', (req, res) => {    
    let fl=req.body.flag;
    console.log(fl);
  
    // var nme=req.body.name;
  //   console.log(nme);
 
   Product.findAll({
        where: {
            name : req.body.name
        }
    })
    .then((products) =>{

        Cart.findAll({
            where : {
                name: req.body.name
            }
        })
        .then((mycart)=>
        {   
           if(mycart.length == 0)
           {
            Cart.create({
                name: products[0].dataValues.name,
                manufacturer: products[0].dataValues.manufacturer,
                price: products[0].dataValues.price,
                quantity: 1})
           }
           else
        {
            Cart.update({
                quantity: mycart[0].dataValues.quantity+1 },
                 { where: { name: req.body.name } 
            })
        }
        })
       
       /* Cart.create({
        name: products[0].dataValues.name,
        manufacturer: products[0].dataValues.manufacturer,
        price: products[0].dataValues.price*/
        
    })

    .then((products) =>{
    console.log('i am in then');
    })
    .catch((err) => {
        res.status(101).send({
            error: "ERROR ENCOUNTERED"
        })
    })

    })

exports = module.exports = route