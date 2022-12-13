const express = require('express')
const router = express.Router()
const {getUserById} = require('../db/users')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    
    if (!auth) { 
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      
      try {
        const parsedToken = jwt.verify(token, JWT_SECRET);
        
        const id = parsedToken && parsedToken.id
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch (error) {
        next(error);
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

  router.use((req, res, next) => {
    if(req.user){

    }
    next()
  })

  const usersRouter = require('./users')
  router.use('/users', usersRouter)
  

  const monRouter = require('./pokemon')
  router.use('/pokemon', monRouter)

  const dexRouter = require('./pokedex')
  router.use('/pokedex', dexRouter)
  
  module.exports = router