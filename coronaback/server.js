require('dotenv').config()

const express = require('express')
//Runs express function
const app = express()
//Bcrypt hoitaa passwordin hashauksen
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())

const users = [
]

app.get('/register', (req, res) => {
  res.json(users)
})

//Ottaa ja puskee REST requestista tulevan POST-pyynnön ja pushaa sen users taulukkoon objektina. 

app.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.post('/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
      console.log(process.env.ACCESS_TOKEN_SECRET)
      res.send('Success')
     res.json({ accessToken: accessToken})
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})


app.listen(8080)