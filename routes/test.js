router.post('/user/login', (req, res)=> {
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
            res.status(200).json({"message":"login valid"});
          }else{
            res.json('invalid')
          }
        })
      }
    })
  })