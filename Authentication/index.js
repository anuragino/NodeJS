/** *
    *Authentication -> Checking if user is Valid or not
    *Authorization -> allowing  valid user to use resources

    *Ecryption -> cypher text generate
    use bcryptjs module from npm ,it do salting && hashing

    *Hashing can not be reverted , Encryption can be decoded

    *JWT ->Json Web Token issued if valid user used for Authentication and Authorization
     JWT = Header + payload + privateKey

     *status code  res.status(201).send()
     201 successfull creation
     401 unauthorized token
     404 no user found
     500 internal server error

*/
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Connection
mongoose.connect("mongodb://localhost:27017/AuthTut")
.then(()=>{
    console.log("Connection Secured")
})
.catch((err)=>{
    console.log(err);
})

// Schema for users
const userSchema = mongoose.Schema({
    name:{
        type: String,
        require : true
    },
    email:{
        type: String,
        require : true
    },
    password:{
        type: String,
        require : true
    }
},{timestamps:true})

// Model
const userModel = mongoose.model("users",userSchema);

// endpoint
const app = express();
app.use(express.json())

// endpoint to Registeration 
app.post("/register",(req,res)=>{
    let user = req.body;

    //encryption
    bcrypt.genSalt(14,(err,salt)=>{
        if(!err){
            bcrypt.hash(user.password,salt,(err,hpass)=>{
                if(!err){
                    user.password = hpass;

                    userModel.create(user)
                    .then((record)=>{
                        console.log(record)
                        res.status(201).send({data:record , message:"User registration Successfully "})
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(500).send({message:"Some problem"})
                    })
                }else{
                    console.log(err);
                    res.send({message:"Some Problem"});
                }
            })
        }
    })

})

// endpoint to login
app.post("/login",(req,res)=>{
    userCred = req.body;

    userModel.findOne({email:userCred.email})
    .then((user)=>{
        if(user!=null){

            //compare password using hashing ,so security can't be breached
            bcrypt.compare(userCred.password,user.password,(err,result)=>{
                if(result===true){
                    
                    // generate token and send back  ,here "Ajwaen" is SecretKey
                    jwt.sign({email:userCred.email},"Ajwaen",(err,token)=>{
                        if(!err){
                            console.log(token)
                            res.send({token:token})
                        }else{
                            res.status(500).send({message:"Issue in token generation"})
                        }
                    })
                }else{
                    res.status(401).send({message:"Incorrect password"})
                }
            })
        }else{
            res.status(404).send({message:"User not found"})
        }
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem"})
    })
})



app.get("/getdata",verifyToken,(req,res)=>{
    res.send({message:"You are Valid user"})
})

function verifyToken(req,res,next){
    let token = req.headers.authorization.split(" ")[1];
    // check if u r Authorized or not  ,here "Ajwaen" is SecretKey
    jwt.verify(token,"Ajwaen",(err,data)=>{
        if(!err){
            console.log(data);
            next()
        }else{
            console.log(err)
            res.status(401).send({message:"Invalid Token please check"})
        }
    })
}









app.listen(8000,(()=>{
    console.log("Server Up and Running")
}))

