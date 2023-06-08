const express = require('express')
const Appointment = require('../models/appointments')
const {
    getAppointment,
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentByDate
} = require('../controllers/appointmentController')


const router = express.Router()

// GET Schedule by date
router.get('/appointmentDate', getAppointmentByDate)

// GET ALL appointments
router.get('/', getAppointments)

// GET ONE appointment
router.get('/:id', getAppointment)

// GET Schedule
// router.get('/schedule/:id', getSchedule)

// CREATE a NEW appointment
router.post('/', createAppointment)

// DELETE a barber
router.delete('/:id', deleteAppointment)

// UPDATE a barber
router.patch('/:id', updateAppointment)

module.exports = router