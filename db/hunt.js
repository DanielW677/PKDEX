const client = require("./client")

async function createHunt(userId){
    try {
        const {rows: [hunt]} = await client.query(`
            INSERT INTO huntdata("userId")
            VALUES ($1)
            RETURNING *;
        `, [userId])
    } catch (error) {
        console.log(error)
    }
}

async function joinHunts(userId){
    try {
        const {rows: [hunt]} = await client.query(`
            SELECT * 
            FROM huntdata
            WHERE "userId"=$1
        `, [userId])
        console.log('this is hunt', hunt)

        const {rows: pokemon} = await client.query(`
            SELECT *
            FROM pokemon
            INNER JOIN huntnext
            ON pokemon.id = huntnext."pokemonId"
            WHERE huntdata."huntId" = $1
        `, [hunt.huntId])
        return pokemon
    } catch (error) {
        console.log(error)
    }
}

async function addToHunt({userId, pokemonId, natId}){
    try {
        const {rows} = await client.query(`
            INSERT INTO huntnext("userId", "pokemonId", "natId")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [userId, pokemonId, natId])
        return rows
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addToHunt,
    createHunt,
    joinHunts
}