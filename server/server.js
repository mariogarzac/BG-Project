const express = require('express');
const cors = require('cors')
//const bodyParser = require('body-parser')
const connectDB = require('./config/db');
const userModel = require('./config/models/barberModel');
const barberRoutes = require('./config/routes/barberRoutes');
const appointmentRoutes = require('./config/routes/appointmentRoutes');
// const { getBarber } = require('./config/controllers/barberController')

const app = express()
app.use(cors());

connectDB();

// Middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({msg: "Prueba exitosa"})
})

// ROUTES
app.use('/api/barbers', barberRoutes)
app.use('/api/appointments', appointmentRoutes)

app.listen(5002,() => {console.log("Server started in port 5002")})

app.get("/insert", (req, res)=> {
    var user = new userModel({
        name : "Genaro",
        last_name : "Sanudo"
    });

    user.save()

    console.log("Se agrego barbero")
})

// app.get("/getBarber", async (req, res)=> {
//     // getBarber(req)
    
    // const users = await userModel.find()

    // res.status(200).json(users)
//     console.log("creo que si jalo")
// })

