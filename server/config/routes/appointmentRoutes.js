const express = require('express')
const Appointment = require('../models/appointments')
const {
    getAppointment,
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointment
} = require('../controllers/appointmentController')


const router = express.Router()

// GET ALL appointments
router.get('/', getAppointments)

// GET ONE appointment
router.get('/:id', getAppointment)

// GET Schedule
// router.get('/schedule/:id', getSchedule)

// // GET Schedule by day
// router.get('/scheduleDay/:id', getScheduleDay)

// CREATE a NEW appointment
router.post('/', createAppointment)

// DELETE a barber
router.delete('/:id', deleteAppointment)

// UPDATE a barber
router.patch('/:id', updateAppointment)

module.exports = router