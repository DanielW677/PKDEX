require('dotenv').config('./env')
const express = require('express')
const morgan = require('morgan')
const apiRouter = require('./api')
const cors = require('cors')

const app = express()
const client = require('./db/client')

app.use(morgan('dev'))
app.use(cors())
client.connect()
app.use(express.json())
app.use((req, res, next) => {
    console.log('--------------------')
    console.log ('This is the body', req.body)
    console.log('--------------------')
    next()
})


const port = 1337;
app.listen(port, () => {
    console.log(`Pokedex is running on PORT ${port}`)
})

app.use(`/api`, apiRouter)