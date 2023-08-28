require("dotenv").config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')

const app = express()

// DB Connect
const dbURL = process.env.MONGO_URL;
mongoose.connect(dbURL)
    .then(() => {
        console.log("Mongo DB Connect Successfully")
    }).catch(error => {
        console.log(error)
        process.exit(1)
    })

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.post('/register', (req, res) => {
    try {
        const newUser = new User(req.body)
        newUser.save()
        res.status(201).json({ message: 'New User Create Successfully', newUser })
    } catch (error) {
        res.status(400).json(error.message)
    }
})
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (user && user.password === password) {
            res.status(200).json({ message: 'Login Successfully' })
        } else {
            res.status(400).json({ message: 'User Not Found' })
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
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