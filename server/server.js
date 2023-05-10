const express = require('express');
//const bodyParser = require('body-parser')
const connectDB = require('./config/db');
const userModel = require('./config/models/barber');

const app = express()

connectDB();

app.listen(5002,() => {console.log("Server started in port 5000")})

app.get("/insert", (req, res)=> {
    var user = new userModel({
        name : "Nombre de persona",
        date : Date.now()
    });

    user.save()

    console.log("creo que si jalo")
})

app.get("/get", async (req, res)=> {
    const users = await userModel.find()

    res.status(200).json(users)
    console.log("creo que si jalo")
})


