const express = require('express')
const bodyParser = require('body-parser')

const bd = require('./bd')
const config = require('./config')
const router = require('./network/router')
bd( config.DB_URL )

var app = express()

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended:false}) )

router( app )

app.use('/', express.static('public'))

app.listen( config.PORT )
console.log( `La aplicación está escuchando en http://${config.HOST}:${config.PORT}`)