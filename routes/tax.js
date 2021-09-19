const express = require('express')
const router = express.Router()
const knex = require('../database/db')


router.get('/tax',(req,res)=>{
    knex.select('*').from('tax')
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})

router.get('/tax/:tax_id',(req, res)=>{
    knex.select('*').from('tax')
    .where('tax_id',req.params.tax_id)
    .then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


module.exports = router


