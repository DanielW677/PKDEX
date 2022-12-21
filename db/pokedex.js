const client = require('./client')


async function createDex(userId){
    try {
        const {rows: [dex]} = await client.query(`
            INSERT INTO fodder("userId")
            VALUES ($1)
            RETURNING *;
        `, [userId])
        return dex
    } catch (error) {
        console.log(error)
    }
}


async function joinFod(userId){
    try {
        const {rows: [dex]} = await client.query(`
            SELECT *
            FROM fodder
            WHERE "userId"=$1;
        `, [userId])
        // console.log('this is dex', dex)
        // return dex

        const {rows: pokemon} = await client.query(`
           SELECT *
           FROM pokemon
           INNER JOIN pokedex
           ON pokemon.id = pokedex."pokemonId"
           WHERE pokedex."dexId" = $1
        `,[dex.dexId] )
        return pokemon
    } catch (error) {
        console.log(error)
    }
}

async function caughtPokemon({dexId, userId, pokemonId, natId}){
    try {
        const {rows: [pokemon]} = await client.query(`
            INSERT INTO pokedex("dexId", "userId", "pokemonId", "natId")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [dexId, userId, pokemonId, natId])
        return pokemon
    } catch (error) {
        console.log(error)
    }
}

async function checkDex(){
    try {
        const {rows} = await client.query(`
            
        `)
    } catch (error) {
        console.log(error)
    }
}

async function getDexById(dexId){
    try {
        const {rows: [pokedex]} = await client.query(`
            SELECT *
            FROM fodder
            WHERE "dexId"=$1
        `, [dexId])
        return pokedex
    } catch (error) {
        console.log(error)
    }
}

async function removeMon(pokemonId, userId){
    try {
        const rows = await client.query(`
           DELETE FROM "pokedex"
           WHERE "natId"=$1 AND "userId"=$2
        `, [pokemonId, userId])
        return rows
    } catch (error) {
        console.log(error)
    }
}

module.exports ={ 
    createDex,
    joinFod,
    caughtPokemon,
    getDexById,
    removeMon
}
