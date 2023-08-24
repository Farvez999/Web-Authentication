require("dotenv").config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is RUNNING on port ${process.env.PORT}`)
})