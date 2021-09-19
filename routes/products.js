const express = require('express');
const knex = require('../database/db')
const router = express.Router()
const { authenticateToken } = require('../auth/jwt');


router.get('/product',(req,res)=>{
    knex.select('*').from('product')
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/product/:id',(req,res)=>{
    knex.select('*').from('product')
    .where('product_id',req.params.id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/products/:product_id',(req,res)=>{
    let product_id=req.params.product_id;
    knex.select('*').from('product')
    .where('product_id',product_id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/products/inCategory/:category_id',(req,res)=>{
    const category_id=req.params.category_id;
    knex.select('product.product_id','name','description','price','discounted_price','thumbnail')
    .from('product')
    .join('product_category',function(){
        this.on('product.product_id','product_category.product_id')
    }).where('product.product_id',category_id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/products/inDepartment/:department_id',(req,res)=>{
    const department_id=req.params.department_id;
    knex.select('product.product_id','product.name','product.description','product.price','product.discounted_price','product.thumbnail')
    .from('product')
    .join('product_category',function(){
        this.on('product.product_id','product_category.product_id')
    }).join('category',function(){
        this.on('product_category.category_id','category.category_id')
    }).join('department',function(){
        this.on('category.department_id','department.department_id')
    }).where('department.department_id',department_id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/products/:product_id/details',(req,res)=>{
    const product_id=req.params.product_id;
    knex.select('product_id','name','description','price','discounted_price','image','image_2')
    .from('product')
    .where('product_id',product_id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/products/:product_id/locatons',(req,res)=>{
    const product_id=req.params.product_id;
    knex.select('category.category_id','category.name as category_name','category.department_id','department.name as category_name')
    .from('product')
    .join('product_category',function(){
        this.on('product.product_id','product_category.product_id')
    })
    .join('category',function(){
        this.on('product_category.category_id','category.category_id')
    })
    .join('department',function(){
        this.on('category.category_id','department.department_id')
    }).where('product.product_id',product_id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/products/:product_id/reviews',(req,res)=>{
    const product_id=req.params.product_id;
    knex.select('*').from('review')
    .where('product_id',product_id)
    .then((data)=>{
    console.log("data aagaya hai");
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.post("/product/:product_id/review",authenticateToken,(req, res) =>{
    const product_id=req.params.product_id;
    knex.select('*').from('customer').where('customber_id',req.token_data.customber_id).then((data)=>{
        knex.select('review').insert({
            review: req.body.review,
            review: req.rating,
            product_id: product_id,
            created_on: new Date,
            customber_id: data[0].customber_id
        }).then((data) =>{
            console.log(data)
            res.send(data);
        }).catch((err) =>{
            console.log("something went wrong",err);
            res.send('something went wrong')
        })
    })
})




module.exports = router;