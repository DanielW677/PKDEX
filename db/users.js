const client = require('./client')
const bcrypt = require('bcrypt')
const {createDex} = require('./pokedex')

async function createUser({username, password, isAdmin}){
    const hashWord = await bcrypt.hash(password, 10)
    try {
        const {rows: [user]} = await client.query(`
            INSERT INTO users(username, password, "isAdmin")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [username, hashWord, isAdmin])
        console.log(user)
        const userId = user.id
        await createDex(userId)
            return user
    } catch (error) {
        console.log(error)
    }
}

async function getUserByUsername(username){
    try {
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1;
        `, [username])
        if(!user){
            return null
        }
        // console.log(user)
        return user
    } catch (error) {
        console.log(error)
    }
}

async function getUserById(userId){

    try {
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE id=$1;
        `, [userId])
        if(!user){
            return null
        }
        return user
    } catch (error) {
        console.log(error)
    }
}

async function getMyMons(userId){
    try {
        const {rows} = await client.query(`
            SELECT *
            FROM pokedex
            WHERE "userId"=$1
        `, [userId])
        return rows
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    getMyMons
}