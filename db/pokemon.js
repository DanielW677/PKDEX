const client = require('./client')


async function newPokemon({PKName, type, photo, ShinyPhoto, DexId}){
    try {
        const {rows: [pokemon]} = await client.query(`
           INSERT INTO pokemon("PKName", type, photo, "ShinyPhoto", "DexId")
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *;
        `, [PKName, type, photo, ShinyPhoto, DexId])
        // console.log(pokemon)
        return pokemon
    } catch (error) {
        console.log(error)
    }
}

async function getAllMons(){
    try {
        const {rows} = await client.query(`
            SELECT *
            FROM pokemon
        `)
        return rows
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    newPokemon,
    getAllMons
}