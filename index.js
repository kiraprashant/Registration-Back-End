const express  = require("express")
require("./conncetion")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const UserModel = require("./SchemasandModel/schemaAndModel")

const port = 5000
const app = express()


app.use(express.json())
app.use(cors())

const verifyToken = (req,res,next) =>{
try{
const token = req.headers["x-access-token"]


if(!token){
res.status(403).send("we need a Token")
}
jwt.verify(token,"My-scecret-key",(err,decoded) =>{
    if(err){
        res.json({auth:false, message:"u failed to authenticated"})
    }else{
        req.userEmail = decoded.Email
        next();
    }
})
}
catch(e){
    console.log(e)
}
}

app.get("/",verifyToken,async(req,res)=>{
try{
const data = await UserModel.find()
res.json({data:data,MyEmail:req.userEmail})
}
catch(e){
res.send(e)
}
})

app.get("/:id",async(req,res)=>{
    try{
    const data = await UserModel.findById({_id:req.params.id})
    res.send(data)
    }
    catch(e){
    res.status(401).send(e)
    }
    })



app.put("/:id",async(req,res)=>{
    try{

    const data = await UserModel.updateOne({_id:req.params.id}, {$set: req.body})
    if(data.acknowledged){
        res.send("User SucessFully Updated")
    }
    }
    catch(e){
    res.send(e)
    }
    })

app.post("/",async(req,res)=>{
    try{
        const data = await UserModel(req.body).save()
        if(data){
        res.status(201).json({data,message:"user sucessfully Register"})
        }else{
            res.status(201).json({data,message:"user not sucessfully Register"})
        }
    }
    catch(errors){
        res.status(401).send(errors)
    }
})

app.delete("/:id",async(req,res)=>{
    try{
        const data = await UserModel.deleteOne({_id:req.params.id})
        if(data.acknowledged){
            res.send("User SucessFully Deleted")
        }
    }
    catch(e){
        res.send(e)
    }
})

app.post("/login",async(req,res)=>{
    try{
        const data = await UserModel.find(req.body)
        if(data.length > 0){
            var token = jwt.sign({ Email: req.body.Email }, 'My-scecret-key');
            res.json({
                token:token
            })
        }
        else res.status(401).json({message:"invalid Email or password"}) 
    }
    catch(e){
        res.send(e)
    }
  
})

app.listen(port,()=>{
console.log(`server runing port Number ${port}`)
})

