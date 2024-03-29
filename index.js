const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const usersRouter = require('./Routes/usersRouter')
const tasksRouter = require('./Routes/tasksRouter')
const folderRouter = require('./Routes/folderRouter')
const jwtAuth = require('./middlewares/jwtAuth')

const errorHandler = require('./middlewares/error')
const cors = require('cors')
const PORT = process.env.PORT || 3000

//Top level function of express module
const app = express()

//middlewares
require('dotenv/config')
app.use(body_parser.json())
app.use(cors())
app.options('*',cors())

//Autthentication before using any API

app.use(jwtAuth())

//Routes
var api = process.env.API_URL

app.use(`${api}/users`,usersRouter)
app.use(`${api}/tasks`,tasksRouter)
app.use(`${api}/folder`,folderRouter)

//API documentation route
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/Public/index.html')
})

// To handle error and send custom message
app.use(errorHandler)

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

