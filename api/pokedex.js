const express = require('express')
const client = require('../db/client')
const dexRouter = express.Router()
const {createDex, joinFod, caughtPokemon, getDexById} = require('../db/pokedex')
const {getMyMons} = require('../db/users')
const {reqUser} = require('./utils')
const {getMonByNatId, getMonByLocId} = require('../db/pokemon')

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

dexRouter.post('/add/:pokemonid', reqUser, async (req, res, next) => {
    const {pokemonid} = req.params
    const userId = req.user.id
    const pokeData = {}
    try {
        pokeData.pokemonId = pokemonid
            // console.log('monid', pokemonid) //Coming through correctly
        const dexId = await getDexById(userId)
            // console.log('this is userid', userId)
            console.log('dexid', dexId)
        pokeData.dexId = dexId.dexId
            console.log('this is dexID', dexId.dexId)
        pokeData.userId = userId
            // console.log(userId)
        const pokemon = await getMonByLocId(pokemonid)
            // console.log('this is nat', pokemon.DexId)
        pokeData.natId = pokemon.DexId
        const addToDex = await caughtPokemon(pokeData)
        console.log(addToDex)
        if(addToDex){
            res.send(addToDex)
        }else{
            res.send({
                name: "FailedToAddToCart",
                message: "Something went wrong adding to pokedex. Sorry"
            })
        }
    } catch (error) {
        console.log(error)
    }
    
})


module.exports = dexRouter