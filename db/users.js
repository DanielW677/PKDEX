const client = require('./client')
const bcrypt = require('bcrypt')


async function createUser({username, password, isAdmin}){
    try {
        const {rows: [user]} = await client.query(`
            INSERT INTO users(username, password, "isAdmin")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [username, password, isAdmin])
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createUser
}