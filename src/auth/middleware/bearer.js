'use strict';

const users = require('../models/users.js')
const base64 = require('base-64')

module.exports = async (req, res, next) => {
  console.log('from bearer', JSON.stringify(req.cookies).split(':').pop().replace('"', '').replace('"', '').replace('}', ''));

  try {
    if (!req.headers.authorization) { next('Invalid Login') }
    // console.log('auth', req, req.headers.authorization) ;
    // let token = req.headers.authorization.split(' ').pop();
    // token =  base64.decode(token)
    // console.log(token, 'from bearer');
    const validUser = await users.authenticateWithToken(token);
    console.log('req.headers.authorization', validUser);

    req.user = validUser;
    req.token = validUser.token;

  } catch (e) {
    res.status(403).send('Invalid Login');;
  }

}
