const express = require('express')
const monRouter = express.Router()
const {getAllMons, newPokemon, deleteMon} = require('../db/pokemon')
const {reqAdmin} = require('../api/utils')
monRouter.get('/', async (req,res,next) => {
    try {
        const pokemon = await getAllMons()
        res.send({pokemon})
    } catch (error) {
        console.log(error)
    }
})

monRouter.post('/newmon', reqAdmin, async (req, res, next) => {
    const {PKName, type, photo, ShinyPhoto, DexId} = req.body
    const pokeData = {}
    try {
        pokeData.PKName = PKName
        pokeData.type = type
        pokeData.photo = photo
        pokeData.ShinyPhoto = ShinyPhoto
        pokeData.DexId = DexId
        const newPoke = await newPokemon(pokeData)
        if(newPoke){
            res.send({newPoke})
        }else{
            res.send({message: "failed to create pokemon"})
        }
    } catch (error) {
        console.log(error)
    }
})

monRouter.delete('/deletemon/:pokemonid', reqAdmin, async (req, res) => {
    const {pokemonid} = req.params
    // console.log(pokemonid)

    try {
        const delMon = await deleteMon(pokemonid)
        if(delMon){
            res.send({message: "pokemon Deleted"})
        }else{
            res.send({message: "Failed to delet pokemon"})
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports = monRouter