const express = require('express')
const usersRouter = express.Router();
const {
    createUser,
    getUserByUsername,
    getUserById
} = require('../db/users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {reqUser, reqAdmin} = require('./utils')

usersRouter.post('/register', async (req, res, next) => {
    const {username, password} = req.body
    try {
        const userExists = await getUserByUsername(username)
        
        if(userExists){
            next({
                name: "UserExistsError",
                message: "This username is already taken- Try With a different name"
            })
        }
        const user = await createUser({
            username,
            password
        })
        

        const token = jwt.sign({id: user.id, 
        username: username},
        process.env.JWT_SECRET, {
            expiresIn: "1W"
        })
        res.send({
            user,
            message: "Gotta Catch em all!",
            token
        })

    } catch (error) {
        console.log(error)
    }
})


usersRouter.post('/login', async (req, res, next)=> {
    const {username, password} = req.body
    if(!username || !password){
        next({
            name: "MissingCredsError",
            message: "Missing either username or password"
        })
    }

    try {
        const user = await getUserByUsername(username)
        const hashWord = user.password
        const isValid = await bcrypt.compare(password, hashWord)
        if(user && isValid){
            const token = jwt.sign({id: user.id,
            username: username,   
        }, process.env.JWT_SECRET, {
            expiresIn: "1w"
        })
        res.send({message: `Thanks for logging in ${username}`, token:token})
        }else{
            next({
                name: "InvalidCredsError",
                message: "Username or password is incorrect"
            })
        }
    } catch (error) {
        console.log(error)
    }
})

usersRouter.get('/me', reqUser, async (req, res, next) => {
    const userId = req.user.id
    try {
        const user = await getUserById(userId)
        res.send(user)
        console.log(user)
    } catch (error) {
        console.log(error)
    }
})

module.exports = usersRouter