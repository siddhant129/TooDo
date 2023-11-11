const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const usersRouter = require('./Routes/usersRouter')
const cors = require('cors')
const PORT = process.env.PORT || 3000

//Top level function of express module
const app = express()

//middlewares
require('dotenv/config')
app.use(body_parser.json())
app.use(cors())
app.options('*',cors())

//Routes
var api = process.env.API_URL
app.use(`${api}/users`,usersRouter)
app.get('/',async (req,res)=>{
    res.send('Website is hosted')
})

//Database connection
var uri = process.env.CONNECTION_STRING

mongoose.connect(`${uri}`,{
    // useNewUrlParser : true,
    // useUnifiedTopology : true,
    dbName : 'ToDoListDB',
}).then(()=>{
    console.log('Database connection successful');
}).catch((err)=>{
    console.log(err);
})

app.listen(PORT,()=>{
    console.log(`app is running on https://localhost:${PORT}`)
})

