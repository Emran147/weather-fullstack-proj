const express = require('express')
const app = express()
const api = require('./server/routes/api')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://emranqedan11:E5b8037ec1@emranscluster0.p4bywbz.mongodb.net/WeatherApp?retryWrites=true&w=majority" || "mongodb://127.0.0.1:27017/WeatherDB", { useNewUrlParser: true })

app.use('/', api)

const PORT = 8080
app.listen(process.env.PORT || PORT)
