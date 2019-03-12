const express = require ('express')
const router = express.Router()
const {users, short_url, track_url} = require('../models')
const Chance = require('chance')
const chance = new Chance() 
const auth = require('../Auth/auth')


//get all short_url
router.get('/track', async (req, res, next) => {
    const data = await track_url.findAll()
    res.json(data)
})



//get to ori url
router.get('/:short', async (req,res, next) => {
    //const userData = await auth(req,res,next)
    
    const a = req.params.short
    //console.log(a)
    const data =  await short_url.findOne(
        {where: 
            { shortUrl: 'http://'+req.headers.host+'/'+a }
        })
    const checkTrack = await track_url.findOne({
        where : {
            referrer_url: a
        }
    })
    //plus 1 if found
    const newTrackCount = parseInt(checkTrack.dataValues.uuid) + 1;
    checkTrack.update({uuid:newTrackCount});
    res.redirect(data.dataValues.url)
})




//add short url
router.post('/short', async(req,res)=>{
    const {title, shortUrl, url, userId} = req.body
    console.log(req.body.userId)
    const data = await short_url.create({title: req.body.title, shortUrl: req.body.shortUrl, url: req.body.url, userId:req.body.userId})
    res.json(data)    
    })

//update short url

router.put('/short/:id', async(req, res) => {
    const {title} = req.body
    try {
        Models.short_url.update(
            {title},
            {where : {id:req.params.id}}
        )
     } catch (error) {
        res.json(error)
     }
})

//delete 

router.delete('/short/:id',async(req,res)=>{
    const id = req.params.id
    try {
        Models.short_url.destroy({
            where: {id : id}
        }).then((result)=>{
            res.json(result)
        })
    } catch (error) {
        res.json(error)
    }
   
  })



  //generate url
router.post('/short/generate', async(req, res, next) => {
    const userData = await auth(req,res,next)
    console.log(userData)
      console.log(req.headers.host)
      var hostname = req.headers.host; // hostname = 'localhost:8080'
      const {title, shortUrl, url} = req.body;
      const unikCode = chance.string({length: 10, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });
      const data = await short_url.create({
          title : title,
          shortUrl : 'http://'+req.headers.host+'/'+ unikCode,
          url,
          userId: userData.userId.tokenUser.id
      })
      console.log(data)
    const dataTrack = await track_url.create({
        uuid: 0,
        short_url_id : data.dataValues.id, 
        ip_address : 'ip_address',
        referrer_url: unikCode

      }) 
      console.log(dataTrack)
      res.json(data)
  })




  
module.exports = router