const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
    Lun: Number,
    Mar : Number,
    Mier : Number,
    Juev : Number,
    Vier : Number,
    Sab : Number,
    Dom : Number
});

module.exports = scheduleSchema