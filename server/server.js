const express = require('express')
//const bodyParser = require('body-parser')
const connectDB = require('./config/db')

const app = express()

connectDB();

app.listen(5000,() => {console.log("Server started in port 5000")})

