const Barber = require('../models/barberModel');
// const Schedule = require('../models/schedule')
const mongoose = require("mongoose")

const getBarbers = async (req, res) => {
    const barbers = await Barber.find()

    res.status(200).json(barbers)
}

const getBarber = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese barber'})
    }

    const barber = await Barber.findById(id)
    

    if (!barber){
        return res.status(404).json({error : 'No existe ese barber'})
    }

    res.status(200).json(barber)
}

const getScheduleDay = async (req, res) => {
    const { id } = req.params
    const { day } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese barber'})
    }
    const barber = await Barber.findById(id)
    

    if (!barber){
        console.log("entro aqui")
        return res.status(404).json({error : 'No existe ese barber'})
    }

    res.status(200).json(barber.schedule[day])
}

const getSchedule = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese barber'})
    }
    const barber = await Barber.findById(id)
    

    if (!barber){
        console.log("entro aqui")
        return res.status(404).json({error : 'No existe ese barber'})
    }

    res.status(200).json(barber.schedule)
}

const createBarber = async (req, res) => {
    const {name, last_name, sched} = req.body

    try{
        // const schedule = await Schedule.create({sched, sched, sched, sched, sched})
        const barber = await Barber.create({name, last_name, schedule :{Lun: sched,
            Mar : sched,
            Mier : sched,
            Juev : sched,
            Vier : sched}})
        res.status(200).json(barber)

    }catch (error) {
         res.status(400).json({error: error.message})
    }
    
}

const deleteBarber = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese barber'})
    }

    const barber = await Barber.findOneAndDelete({_id : id}) 
    

    if (!barber){
        return res.status(400).json({error : 'No existe ese barber'})
    }

    res.status(200).json(barber)
}

// const getSchedule = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error : 'No existe ese barber'})
//     }

//     const barber = barberModel.findById(id)

//     if (!barber){
//         return res.status(404).json({error : 'No existe ese barber'})
//     }
// }

const updateBarber = async(req, res) => {
    const { id } = req.params
    const {lunes, martes, miercoles, jueves, viernes} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese barber'})
    }

    const barber = await Barber.findOneAndUpdate({_id : id},{
        schedule : {Lun: lunes, Mar: martes, Mier: miercoles, Juev: jueves, Vier: viernes}
    })

    if (!barber){
        return res.status(404).json({error : 'No existe ese barber'})
    }

    return res.status(200).json(barber)
}

module.exports = {
    getBarber,
    getBarbers,
    createBarber,
    getSchedule,
    getScheduleDay,
    deleteBarber,
    updateBarber
}

// modules.exports = getBarbers
