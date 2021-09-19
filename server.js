const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config()


// attribute
const router = require('./routes/attributes');
app.use('/',router)

// deparments
const deparment = require('./routes/deparments');
app.use('/',deparment)

// cetegeories
const category= require('./routes/cetegeories')
app.use('/',category)

// products
const products= require('./routes/products')
app.use('/',products)

// customers
const customers= require('./routes/customers')
app.use('/',customers)

// orders
const orders=require('./routes/orders')
app.use('/',orders)

//shipping_cart
const shipping_cart=require('./routes/shoppingcart')
app.use('/',shipping_cart)

// tax
const tax= require('./routes/tax')
app.use('/',tax)

// shippig
const shipping= require('./routes/shipping')
app.use('/',shipping)

const Port = process.env.DB_PORT || 2023

app.listen(Port,()=>{
    console.log(`server is running on ${Port} `);
});







