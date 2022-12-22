const client = require('./client')
const {createUser, getUserByUsername, getMyMons } = require('./users')
const {newPokemon, getAllMons, getMonByNatId, getMonByLocId} = require('./pokemon')
const {joinFod, createDex, caughtPokemon} = require('./pokedex')
const {addToHunt, createHunt} = require('./hunt')

async function dropTables(){
    console.log('Starting to drop all tables')
    try {
        await client.query(`
            DROP TABLE IF EXISTS huntnext;
            DROP TABLE IF EXISTS huntdata;
            DROP TABLE IF EXISTS pokedex;
            DROP TABLE IF EXISTS fodder;
            DROP TABLE IF EXISTS pokemon;
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
                "PKName" VARCHAR(255) NOT NULL UNIQUE,
                type VARCHAR(255),
                photo TEXT,
                "ShinyPhoto" TEXT,
                "DexId" INTEGER NOT NULL UNIQUE
            );
            CREATE TABLE fodder(
                "dexId" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users("id")
            );
            CREATE TABLE pokedex(
                id SERIAL PRIMARY KEY,
                "dexId" INTEGER REFERENCES fodder("dexId"),
                "userId" INTEGER REFERENCES users("id"),
                "pokemonId" INTEGER REFERENCES pokemon("id"),
                "natId" INTEGER REFERENCES pokemon("DexId")
            );
            CREATE TABLE huntdata(
                "huntId" SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users("id")
            );
            CREATE TABLE huntnext(
                id SERIAL PRIMARY KEY,
                "huntId" SERIAL REFERENCES huntdata,
                "userId" INTEGER REFERENCES users("id"),
                "pokemonId" INTEGER REFERENCES pokemon("id"),
                "natId" INTEGER REFERENCES pokemon("DexId")
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
                isAdmin: false
            },
            {
                username: "Test2",
                password: "test2",
                isAdmin: false
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
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/906.png',
                DexId: 906
            },
            {
                PKName: "Floragato",
                type: 'Grass',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/907.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/907.png',
                DexId: 907
            },
            {
                PKName: "Meowscarada",
                type: 'Grass/Dark',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/908.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/908.png',
                DexId: 908
            },
            {
                PKName: "Fuecoco",
                type: 'Fire',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/909.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/909.png',
                DexId: 909
            },
            {
                PKName: "Crocalor",
                type: 'Fire',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/910.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/910.png',
                DexId: 910
            },
            {
                PKName: "Skeledirge",
                type: 'Fire/Ghost',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/911.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/911.png',
                DexId: 911
            },
            {
                PKName: "Quaxly",
                type: 'Water',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/912.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/912.png',
                DexId: 912
            },
            {
                PKName: "Quaxwell",
                type: 'Water',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/913.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/913.png',
                DexId: 913
            },
            {
                PKName: "Quaquaval",
                type: 'Water/Fighting',
                photo: 'https://www.serebii.net/scarletviolet/pokemon/new/914.png',
                ShinyPhoto: 'https://www.serebii.net/Shiny/SV/new/914.png',
                DexId: 914
            }
        ]
        const pokemon = await Promise.all(monsToMake.map(newPokemon))
        console.log('mons made')
    } catch (error) {
        console.log(error)
    }
}
async function dex(){
    try {
        const dee = await createDex(1)
        const dee2 = await createDex(2)
        console.log(dee)
    } catch (error) {
        console.log(error)
    }
}
async function initalMonsCaught(){
    console.log('Starting to catch em all')
    try {
        const monToCatch = [
            {
                dexId: 1,
                userId: 1,
                pokemonId: 4,
                natId: 909
            },
            {
                dexId: 1,
                userId: 1,
                pokemonId: 3,
                natId: 908
            },
            {
                dexId: 2,
                userId: 2,
                pokemonId: 3,
                natId: 908
            }
        ]
        const monCaught = await Promise.all(monToCatch.map(caughtPokemon))
        console.log('Caught some of em')
    } catch (error) {
        console.log(error)
    }
}

async function hunt(){
    try {
        const hunt1 = await createHunt(1)
        const hunt2 = await createHunt(2)
        const hunt3 = await createHunt(3)
    } catch (error) {
        console.log(error)
    }
}

async function initalHunt(){
    console.log('Starting to hunt mons')
    try {
        const monToHunt = [
            {
                userId: 1,
                pokemonId: 3,
                natId: 908
            },
            {
                userId: 2,
                pokemonId: 4,
                natId: 909
            },
            {
                userId: 3,
                pokemonId: 5,
                natId: 910
            }
        ]
        const monHunt = await Promise.all(monToHunt.map(addToHunt))
        console.log('Caught some of em')
    } catch (error) {
        console.log(error)
    }
}

async function monsCheck(){
    console.log('starting to get mons')
    try {
        const mons = await getMonByLocId(7)
        console.log(mons)
        console.log('got mons')
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
        // await dex()
        await hunt()
        await initalHunt()
        await initalMonsCaught()
        await monsCheck()
        // await test()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    rebuildDB
}