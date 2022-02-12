const express = require('express')
const bcrypt = require('bcrypt-nodejs') // secured passwords
const cors = require('cors') // server connection with app - fetch error
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1', // localhost
    //port : 3001, // add your port number here
    user: 'postgres', // add your user name for the database here
    password: 'test', // add your correct password in here
    database: 'smart-brain', // add your database name you created here
  }
})

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => { res.send('success') })
app.post('/signin', signin.handleSignin(db, bcrypt)) // or this code --> (req, res) => { signin.handleSignin(req, res, db, bcrypt)
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, () => {
  console.log('app is running on port 3001')
})
