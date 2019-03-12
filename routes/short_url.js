const express = require ('express')
const router = express.Router()
const Models = require('../models/index')


//get short_url
router.get('/short', (req, res) => {
    Models.short_url.findAll()
  .then(short => {
    res.json(short);
    })
  })
module.exports = router
