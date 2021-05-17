'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'mysecret';


module.exports = async (req, res, next) => {
  

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ').pop() ;
  let [user, pass] = base64.decode(basic).split(':');
  // console.log(user, pass);
  try {
    req.user = await User.authenticateBasic(user, pass)
    let token = jwt.sign({username: user.username}, SECRET);
    // console.log(req.user);
    req.token = token
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}

