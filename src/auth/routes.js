'use strict';

const express = require('express');
const authRouter = express.Router();


const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: {
        _id: userRecord.id,
        username: userRecord.username
      },
      token: userRecord.token
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  
  // res.cookie('auth-token', req.user.token);
  res.set('auth-token', req.user.token);


  // console.log(req.token);
  // res.cookie('auth-token', req.token);
  const output = {
    user: {
      _id: req.user.id,
      username: req.user.username
    },
    token: req.user.token
  };
  res.status(200).json(output);

  // res
  // .writeHead(200, {
  //   "Set-Cookie": `token=${req.user.token}; HttpOnly`,
  //   "Access-Control-Allow-Credentials": "true"
  // })
});


authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;
