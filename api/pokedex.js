const express = require('express')
const dexRouter = express.Router()
const {createDex, joinFod, caughtPokemon} = require('../db/pokedex')
const {getMyMons} = require('../db/users')
const {reqUser} = require('./utils')

dexRouter.get('/viewmons', reqUser, async  (req, res, next) => {
    const userId = req.user.id
    console.log('this si user', userId)
    try {
        const mons = await joinFod(userId)
        if(mons.length){
            res.send({mons})
        }else{
            next({
                name: "getCatching",
                message: "Start getting mons today!"
            })
        }

    } catch (error) {
        console.log(error)
    }
})


module.exports = dexRouter