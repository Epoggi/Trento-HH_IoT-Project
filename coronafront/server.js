const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const withAuth = function(req, res, next)  {
  let type = req.body.type;

  if (type = "user"){
    res.status(401).send('401: You are not authorized to view this.');
  } else {
    req.name = decoded.name;
    next();
  }
}

const Logins = [
  {
    name: "user",
    password: "user",
    type: "user"
  },
  {
    name: "admin",
    password: "admin",
    type: "admin"
  }
]


const user = [
  {
      name: 'Simeoni Häyhä',
      health: 'Good'
  }
]

app.use('/login', (req, res) => {
  let user = Logins.find( x => x.name === req.body.name);
  if (user){
    res.send({
      token: 'test123',
      type: user.type
    });
  } else {
    res.send({
      message: "Error"
    });
  }
});

app.use('/user', (req, res) => {
  res.send(user);
});

app.use('/admin', withAuth, (req, res) => {
  res.send(Logins);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));