const mongoose = require("mongoose");
const scheduleModel = require('./schedule');

const userSchema = mongoose.Schema({
    name: String,
    last_name : String,
    sched : scheduleModel
});

module.exports = mongoose.model('Barber', userSchema);