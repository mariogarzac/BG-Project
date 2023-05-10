const barberModel = require('../config/models/barber');
const mongoose = require("mongoose")

const getBarbers = async (req, res) => {
    const barbers = await barberModel.find()

    res.status(200).json(barbers)
}

const getBarber = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese barber'})
    }

    const barber = barberModel.findById(id)

    if (!barber){
        return res.status(404).json({error : 'No existe ese barber'})
    }

    res.stauts(200).json(barber)
}

const createBarber = async (req, res) => {
    const {name, last_name, sched} = req.body

    try{
        const barber = await barberModel.create({name, last_name, sched})
        res.status(200).json(barber)

    }catch (error) {
         res.stauts(400).json({error: error.message})
    }
    
}

const getSchedule = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No existe ese barber'})
    }

    const barber = barberModel.findById(id)

    if (!barber){
        return res.status(404).json({error : 'No existe ese barber'})
    }
}