const Appointment = require('../models/appointments');
const mongoose = require("mongoose")

const getAppointments = async (req, res) => {
    const appointments = await Appointment.find()

    res.status(200).json(appointments)
}

const getAppointment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese appointment'})
    }

    const appointment = await Appointment.findById(id)
    

    if (!appointment){
        return res.status(404).json({error : 'No existe ese appointment'})
    }

    res.status(200).json(appointment)
}


const getAppointmentByDate = async (req, res) => {
    const { date, barber } = req.body


    const appointment = await Appointment.find({date : date, barber_id : barber})

    console.log("entro aqui")
    

    if (!appointment){
        return res.status(404).json({error : 'No existe ese appointment olaa'})
    }

    res.status(200).json(appointment)
}

const createAppointment = async (req, res) => {
    const {barber_id, customer_name, customer_email, date, hour} = req.body
    console.log("llego aqui")

    try{
        unique_key = date.toString() + barber_id.toString() + hour.toString()
        const appointment = await Appointment.create({barber_id, customer_name, customer_email, date, hour, unique_key})
        res.status(200).json(appointment)

    }catch (error) {
         res.status(400).json({error: error.message})
    }
    
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese appointment'})
    }

    const appointment = await Appointment.findOneAndDelete({_id : id}) 
    

    if (!appointment){
        return res.status(400).json({error : 'No existe ese appointment'})
    }

    res.status(200).json(appointment)
}



const updateAppointment = async(req, res) => {
    // const { id } = req.params
    // const {lunes, martes, miercoles, jueves, viernes} = req.body

    // if (!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error : 'No existe ese barber'})
    // }

    // const barber = await Barber.findOneAndUpdate({_id : id},{
    //     schedule : {Lun: lunes, Mar: martes, Mier: miercoles, Juev: jueves, Vier: viernes}
    // })

    // if (!barber){
    //     return res.status(404).json({error : 'No existe ese barber'})
    // }

    return res.status(200).json({msg: "todavia no esta"})
}

module.exports = {
    getAppointment,
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    getAppointmentByDate
}

