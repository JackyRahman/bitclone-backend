// router.post('/post', verifyToken,(req, res)=> {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//       console.log(req.token)
//       if(err){
//         console.log(err)
//         res.sendStatus(403)
//       }else{
        
//         res.json({
//           message: 'Create user....', 
//           authData
//         })
//       }
//     }) 
//   })
const jwt = require ('jsonwebtoken')
module.exports = (req, res, next ) => {
    //get auth header value
const bearerHeader = req.headers['authorization'];
//check if bearer is undefined
if(typeof bearerHeader !== 'undefined'){
  //split at the space
  const bearer = bearerHeader.split(' ');
  console.log(bearer)
  //get token from array
  const bearerToken = bearer[1]
  console.log(bearerToken)
  //set the token
  req.token = bearerToken;
  //next midlleware
  req.userId = jwt.verify(req.token, 'secretkey');

  return req
}else{
  res.sendStatus(403) 
} 
}

  