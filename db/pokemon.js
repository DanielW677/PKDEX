const client = require('./client')


async function newPokemon({PKName, type, photo, ShinyPhoto}){
    try {
        const {rows: [pokemon]} = await client.query(`
           INSERT INTO pokemon("PKName", type, photo, "ShinyPhoto")
           VALUES ($1, $2, $3, $4)
           RETURNING *;
        `, [PKName, type, photo, ShinyPhoto])
        console.log(pokemon)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    newPokemon
}