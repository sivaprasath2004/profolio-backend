const express=require('express')
const app=express()
const cors=require('cors')
const Schema =require('./mongodb/schema') 
require('dotenv').config()
const mongoose=require('mongoose')
const {mailing}=require('./mail/mail')
const dbURI=process.env.DB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(cors({  origin: 'https://sivaprasath2004.github.io/portfolio/'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',()=>console.log("sorry this only for my personal Use"))
app.post('/contactus',async(req,res)=>{
    await Schema.create(req.body)
    let result=mailing(req.body.email,req.body.message)
    if(!result){
        res.status(200).send({response:true,text:"Error"})
        return
    }
    setTimeout(()=>{ 
        res.status(200).send({response:true,text:"Thank you for Contacting"})
    },2000) 
})
app.listen(5000,()=>console.log('Server listen in 5000'))
