const express = require('express')
const router = express.Router()
const {users, short_url,track_url} = require('../models')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require ('bcrypt')
const salt = 10
var chance = require('chance').Chance();
const jwt = require('jsonwebtoken')




router.get('/user', async(req, res) => {
  const data = await users.findAll({include: [{model:short_url}]})
  res.json(data)
})



router.post('/login', (req, res,) => {

  users.findOne({
    where: {
      email : req.body.email
    }
  })
  // const user = {
  //   id: 1,
  //   username: "ozyzakarya",
  //   password: "ozyzakarya@gmail.com"
  //}
  
  jwt.sign({users}, 'secretkey', (err, token) => {
    res.json({
      token
    })
  })
})



//add user

router.post('/user/create', [
  check('email').exists(),
  check('password').isLength({min: 5}),
], (req, res) => {
  const {email, password} = req.body
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
  
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    users.create({
      email : req.body.email,
      password : hash
    })
    .then(data=>{
      res.json(data)
    })
  })
})





router.post('/user/login', async(req, res)=> {
    console.log(typeof req.body.email)
    users.findOne({
      where: {
        email : req.body.email
      }
    })
    .then(userData=>{
      console.log(userData)
      if(!userData) {
        res.json({"message":"not valid"})
      } else {
        bcrypt.compare(req.body.password, userData.dataValues.password, async (err, result)=> {
          if(result==true){
            const checkUser = await users.findOne({ where: {email: req.body.email}})
            const tokenUser = {
              id: checkUser.dataValues.id,
              email: req.body.email
            }
            jwt.sign({tokenUser}, 'secretkey', (err, token) => {
              token = 'Bearer ' + token
              res.json({
                token
              })
            })
            
          }else{
            res.json('invalid')
          }
        })
      }
    })
  })


// //update user
router.put('/user/:id', async(req, res) => {
  const {email} = req.body
  
  try {
    //console.log(email)
     users.update(
          {email},
          {where : {id:req.params.id}}
      )
   } catch (error) {
      res.json(error)
   }
})

//  //delete user
 router.delete('/user/:id',async(req,res)=>{
  const id = req.params.id
  try {
      users.destroy({
          where: {id : id}
      }).then((result)=>{
          res.json(result)
      })
  } catch (error) {
      res.json(error)
  }
})

//logout
router.get('/', (req, res) => {
  res.json({
    success : true,
    data : req.users
  })
})



module.exports= router
