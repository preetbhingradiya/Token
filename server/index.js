const express=require('express')
const connect = require('./db')
const cors=require('cors')
const cookie=require('cookie-parser')
const user = require('./routes/user.routes')


const app=express()


app.use(cors({
    credentials:true,
    origin:['http://localhost:3000','http://localhost:8080','http://localhost:4200']
}))
app.use(cookie())
app.use(express.json())
app.use('/api',user)


app.listen(8000,()=>{
    console.log("Connect to port")
    connect()
})