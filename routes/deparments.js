const express = require('express');
const knex = require('../database/db')
const router = express.Router()

router.get('/department',(req,res)=>{
    knex.select('*').from('department')
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})


router.get('/department/:id',(req,res)=>{
    knex.select('*').from('department')
    .where('department_id',req.params.id)
    .then((data)=>{
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})

module.exports = router;









