// DEPENDENCIES
const { Sequelize } = require('sequelize')
const express = require('express')
const app = express()

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})
//controllers
const bandController = require('./controllers/band_controller')
app.use('/bands', bandController)
const eventController = require('./controllers/Event_controller')
app.use('/events', eventController)
const stageController = require('./controllers/stage_controller')
app.use('/stages', stageController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})

