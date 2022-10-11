//Dependencies
const events = require('express').Router()
const { Events } = require('pg')
const db = require('../models')
const {Event, Band, Stageevents, Stage} = db

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll()
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE AN EVENT
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// FIND A SPECIFIC BAND
events.get('/:name', async (req, res) => {
    try {
        const foundEvents = await Event.findOne({
            where: { name: req.params.name  },
            include: [ 
        { 
            model: MeetGreet, 
            as: "meet_greets",
            include: { 
                model: Band, 
                as: "Band",
                where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
            } 
        },
        { 
            model: SetTime,
            as: "set_times",
            include: { 
                model: Band, 
                as: "Band",
                where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
            },
            include: {
                model: Stage,
                as: "stage",
                where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
            }
        },
        { 
            model: Stage,
            as: "stages",
            include: { 
                model: Stageevents, 
                as: "StageEvent",
                where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
            }
        }
    ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A Event
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} Event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A EVENT
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = events