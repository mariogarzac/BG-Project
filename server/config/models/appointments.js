const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    barber_id : String,
    customer_name : String,
    customer_email : String,
    date : Date,
    hour : Number,
    unique_key : {type : String, unique : true}
});

module.exports = mongoose.model('Appointment', appointmentSchema);