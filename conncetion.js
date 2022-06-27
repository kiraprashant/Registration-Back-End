const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/kira").then(()=>{
console.log("connceted")
}).catch((e)=>{
console.log("not connected")
})