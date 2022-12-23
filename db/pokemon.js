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

async function getMonByNatId(natId){
    try {
        const {rows} = await client.query(`
            SELECT *
            FROM pokemon
            WHERE "DexId"=$1;
        `, [natId])
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getMonByLocId(localId){
    try {
        const {rows: [pokemon]} = await client.query(`
            SELECT *
            FROM pokemon
            WHERE id=$1;
        `, [localId])
        return pokemon
    } catch (error) {
        console.log(error)
    }
}

async function deleteMon(DexId){
    try {
        const result = await client.query(`
            DELETE FROM pokemon
            WHERE "DexId"=$1
        `, [DexId])
        return result
    } catch (error) {
        console.log(error)
    }
}

// async function getDataByname(pokName){
//     try {
//         const {row}
//     } catch (error) {
//         console.log(error)
//     }
// }
module.exports = {
    newPokemon,
    getAllMons,
    getMonByNatId,
    getMonByLocId,
    deleteMon
}