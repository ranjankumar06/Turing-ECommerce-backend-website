const express=require('express')
const knex=require('../database/db')
const router = express.Router()

router.get('/shipping/regions',(req,res)=>{
    knex.select('*').from('shipping_region')
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/shipping/regions/:shipping_region_id',(req,res)=>{
    knex
    .select('*')
    .from('shipping')
    .where('shipping_region_id',req.params.shipping_region_id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
    })
})



module.exports = router