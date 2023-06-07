const express = require('express')
const Barber = require('../models/barberModel')
const {
    getBarber,
    getBarbers,
    createBarber,
    getSchedule,
    getScheduleDay,
    deleteBarber,
    updateBarber
} = require('../controllers/barberController')


const router = express.Router()

// GET ALL barbers
router.get('/', getBarbers)

// GET ONE barber
router.get('/:id', getBarber)

// GET Schedule
router.get('/schedule/:id', getSchedule)

// GET Schedule by day
router.get('/scheduleDay/:id', getScheduleDay)

// CREATE a NEW barber
router.post('/', createBarber)

// DELETE a barber
router.delete('/:id', deleteBarber)

// UPDATE a barber
router.patch('/:id', updateBarber)

module.exports = router