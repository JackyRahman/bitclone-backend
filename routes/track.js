const express = require ('express')
const router = express.Router()
const {users, short_url, track_url} = require('../models')

router.get('/track', async(req,res)=>{
    console.log(req.body)
    const data = await track_url.findAll()
    res.json(data)
})


module.exports = router