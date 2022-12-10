const client = require('./client')
const bcrypt = require('bcrypt')


async function createUser({username, password, isAdmin}){
    const hashWord = await bcrypt.hash(password, 10)
    try {
        const {rows: [user]} = await client.query(`
            INSERT INTO users(username, password, "isAdmin")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [username, hashWord, isAdmin])
        // console.log(user)
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



module.exports = {
    createUser,
    getUserByUsername
}