const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')
const app = express()
const name = require('./routes/users')
const short = require('./routes/short')
const bodyParse =require('body-parser')
const auth = require('./Auth/auth')

//midleware
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())
app.use(cors())

const sequelize = new Sequelize('bitly', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/api', name)
app.use('/', short)

//app.use(auth)


app.listen(3005, () => console.log('Server started on port 3005...'))