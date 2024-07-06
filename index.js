const express=require('express')
const app=express()
const cors=require('cors')
const Schema =require('./mongodb/schema') 
require('dotenv').config()
const mongoose=require('mongoose')
const {mailing}=require('./mail/mail')
const dbURI=process.env.DB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const corsOptions = {
  origin: 'https://sivaprasath2004.github.io',
   methods: ['GET', 'POST'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type'], // Allow only headers with Content-Type
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{res.send("How can i help you")})
app.post('/contactus',async(req,res)=>{
    await Schema.create(req.body)
    let result=mailing(req.body.email,req.body.message)
    if(!result){
        res.status(200).send({response:true,text:"Error"})
        return
    }
    setTimeout(()=>{ 
        res.status(200).send({response:true,text:"Thank you for Contacting"})
    },500) 
})
app.listen(5000,()=>console.log('Server listen in 5000'))
