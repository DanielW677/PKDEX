const express = require('express')
const client = require('../db/client')
const huntRouter = express.Router()
const {createHunt, joinHunts, addToHunt} = require('../db/hunt')


// huntRouter.post('/')