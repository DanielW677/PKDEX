const client = require('./client')
const {createUser } = require('./users')
const {newPokemon} = require('./pokemon')

async function dropTables(){
    console.log('Starting to drop all tables')
    try {
        await client.query(`
            DROP TABLE IF EXISTS pokemon;
            DROP TABLE IF EXISTS pokedex;
            DROP TABLE IF EXISTS users;
        `)
        console.log('Done dropping tables')
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

async function makeTables(){
    console.log('Starting to make tables')
    try {
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT FALSE
            );
            CREATE TABLE pokemon(
                id SERIAL PRIMARY KEY,
                "PKName" VARCHAR(255) NOT NULL,
                type VARCHAR(255),
                photo TEXT,
                "ShinyPhoto" text
            );
            CREATE TABLE pokedex(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users("id")
            );
        `)
    } catch (error) {
        console.log(error)
        throw(error)
    }
}


async function firstUsers(){
    console.log('Starting to make new users')
    try {
        const usersToCreate = [
            {
                username: "Daniel",
                password: "daniel123",
                isAdmin: true
            },
            {
                username: "Test1",
                password: "test1",
            },
            {
                username: "Test2",
                password: "test2",
            }
        ]
        const users = await Promise.all(usersToCreate.map(createUser))
        console.log('Users Made')
    } catch (error) {
        console.log(error)
    }
}

async function firstMons(){
    console.log('Creating first pokemons')
    try {
        const monsToMake = [
            {
                PKName: "Sprigatito",
                type: 'Grass',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/906.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/906.png'
            },
            {
                PKName: "Floragato",
                type: 'Grass',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/907.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/907.png'
            },
            {
                PKName: "Meowscarada",
                type: 'Grass/Dark',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/908.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/908.png'
            }
        ]
        const pokemon = await Promise.all(monsToMake.map(newPokemon))
        console.log('mons made')
    } catch (error) {
        console.log(error)
    }
}

async function rebuildDB(){
    try {
        client.connect()
        await dropTables()
        await makeTables()
        await firstUsers()
        await firstMons()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    rebuildDB
}