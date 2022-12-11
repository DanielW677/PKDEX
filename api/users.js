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
const {JWT_SECRET} = process.env

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
            name: "MissingInfoError",
            message: "Need both a username and password to login"
        })
    }
    try {
        const user = await getUserByUsername(username)
        console.log(user)
        if(!user){
          res.send({
            name: "LL",
            message: "This user dosent exist"
          })
        }
        // console.log('this is user', user)
        const rPassword = await bcrypt.compare(password, user.password)
        // console.log('this is rPa', rPassword)
        if(user && rPassword){
            const token = jwt.sign( { id: user.id, username: user.username}, JWT_SECRET)
            delete user.password
            res.send({message: 'Get ready to catch em all!', token: token, user})
        }else{
            next({
                name: "IncorrectInfo",
                message: 'Username or password is wrong'
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
        if(user){
            delete user.password
            res.send(user)
        }else{
            res.send('FAILED')
        }
        console.log(user)
    } catch (error) {
        console.log(error)
    }
})

module.exports = usersRouter