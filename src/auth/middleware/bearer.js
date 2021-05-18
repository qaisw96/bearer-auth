'use strict';

const users = require('../models/users.js')

module.exports = async (req, res, next) => {
  
  try {
    // let token =  JSON.stringify(req.cookies).split(':').pop().replace(/"/g, '').replace('}', '');
    if (!req.headers.authorization) { next('Invalid Login') }
    console.log(req.headers.authorization, 'from the llllll route');
    let token = req.headers.authorization.split(' ').pop();
  
    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;
    // req.token = token;
    next()

  } catch (e) {
    res.status(403).send('Invalid Login');;
  }

}
