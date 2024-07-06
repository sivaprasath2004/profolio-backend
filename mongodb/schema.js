const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    name:String,
    email:String,
    subject:String,
    message:String,
}
)
module.exports=mongoose.model('portfolio',Schema)