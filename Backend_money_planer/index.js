const express = require('express')
const app = express()
const cors = require('cors')
const { db } = require('./db/db')
const {readdirSync} = require('fs')
const { router } = require('./routes/transaction')

require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json())

app.use(cors())

app.get('/', (req,res) => {
    res.send('App')
})

readdirSync('./routes').map((route) => {app.use('/api/v1', require('./routes/'+ route))})

const server = () => {

    db()

    app.listen(PORT, () => {
        console.log('Listening to port: ', PORT)
    })
}

server()