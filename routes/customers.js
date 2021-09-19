const express = require('express');
const knex = require('../database/db')
const router = express.Router()
const {generateAccessToken,authenticateToken}= require('../auth/jwt');
// const e = require('express');


router.post('/customer/register',(req,res)=>{
    knex.select('*')
    .from('customer')
    .where({'email':req.body.email,'password':req.body.password})
    .then((data)=>{
        if (data.length < 1){
            knex('customer').insert(req.body)
            .then((result)=>{
                console.log({'sucess':'User Registered'})
                res.send(({'sucess':'User Registered'}))
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            console.log({'message':'User already exist'})
            res.send({'message':'User already exist'})
        }
    }).catch((err)=>{
        console.log(err)
    })
})


router.get('/customer/:customer_id',authenticateToken,(req,res)=>{
    knex.select('*').from('customer')
    .where('customer_id',req.params.customer_id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})

router.post('/customer/login',(req,res)=>{
    knex.select('*').from('customer')
    .where('email',req.body.email)
    .then((data)=>{
        console.log(data);
        let token=generateAccessToken({'email':data[0].email,'customer_id':data[0].customer_id})
        console.log(token)
        console.log('successfully');
        res.cookie("token",token).send(data)
        // res.send(data)
    }).catch((err)=>{
        console.log(err)
    })

})


router.put('/customer/address',authenticateToken,(req,res)=>{
    let customer_id=req.data.customer_id
    knex.select('*').from('customer')
    .update({'address_1':req.body.address_1,'address_2':req.body.address_2,
'city':req.body.city,'region':req.body.region,'postal_code':req.body.postal_code,'country':req.body.country,
'shipping_region_id':req.body.shipping_region_id})
    .where('customer_id',customer_id)
    .then((data)=>{
        console.log("successfully");
        res.send("successfully")
    }).catch((err)=>{
        console.log(err.message)
        res.send('something went wrong')
    })
})


router.put('/customer/creditCard',authenticateToken,(req,res)=>{
    const customer_id=req.data.customer_id;
    knex.select('customer').from('customer')
    .update({'credit_card':req.body.credit_card})
    .where('customer_id',customer_id)
    .then((data)=>{
        console.log('successfully');
        res.send('successfuly')
}).catch((err)=>{
    console.log(err.message);
    res.send('something went wrong')
})

})



module.exports = router;



