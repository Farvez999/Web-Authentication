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

// route not found
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route Not Found'
    })
})

// handle Server Error
app.use((err, req, res, next) => {
    res.status(500).json({
        message: 'Server Error'
    })
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is RUNNING on port ${process.env.PORT}`)
})