const express = require('express')
const monRouter = express.Router()
const {getAllMons} = require('../db/pokemon')

monRouter.get('/', async (req,res,next) => {
    try {
        const pokemon = await getAllMons()
        res.send({pokemon})
    } catch (error) {
        console.log(error)
    }
})

module.exports = monRouter