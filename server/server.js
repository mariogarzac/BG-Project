const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get("/api", (req,res) => {
   res.json({"users": ["userOne","userTwo", "userThree"]})
})

// app.post('/api/submit', (req, res) => {
//   const { values } = req.body
//   console.log(`Received values: ${values}`)
//   // do something with the values
//   res.send('Data received!')
// })


app.listen(5000,() => {console.log("Server started in port 5001")})

