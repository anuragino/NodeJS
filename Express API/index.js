/** 
    Express -> it's a libarary / module
    It is a collection of functions which help you to create API endpoints
    in much simple way. 

    Middleware -> It's a function which sit between request and API endpoints.
    It check if request is bug/virus free or synatax is coorect ,etc.

 * **/

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Basic Middleware 
function middleman(req,res,next){
    if(req.params.id<10){
        res.send({message:"You are blocked"})
    }
    else{
        next();
    }
}

//Use if you are going to use everywhere or in every function.
// app.use(middleman);

// Use when post , put it'll do stuff req.on("dat",(ch)=>{})  req.on("end",()=>{}))
// middleware to read request in post && put ,convert into js object
app.use(express.json());


//connection
mongoose.connect(process.env.URL_LINK)
.then(()=>{
    console.log("Connection Established")
})
.catch((err)=>{
    console.log(err);
})

//schema
const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,'name is required']
    },
    price:{
        type:Number,
        require:[true,'price is must'],
        min:[1,'price should be greater than 1']
    },
    quantity:{
        type:Number,
        require:[true,'Quantity is Mandatory']
    },
    category:{
        type:String,
        enum:['Clothing','Electronics','Household']
    }
},{timestamps:true})

//Model
const productModel = mongoose.model("Products",productSchema);


// endpoint to fetch all data
app.get("/products",(req,res)=>{
    productModel.find()
    .then((records)=>{
        res.send(records);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error!!"})
    })
})

// endpoint to fetch single product
app.get("/products/:id",(req,res)=>{
    productModel.findOne({_id : req.params.id})
    .then((record)=>{
        res.send(record);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error!!"})
    })
})

// endpoint to create product
app.post("/products",(req,res)=>{
    productModel.create(req.body)
    .then((record)=>{
        res.send({data :record ,message:"Product created"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some problem"})
    })
})

//endpoint to delete product
app.delete("/products/:id",(req,res)=>{
    productModel.deleteOne({_id : req.params.id})
    .then((info)=>{
        res.send({message:"Product deleted"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error!!"})
    })
})


//endpoint to update product
app.put("/products/:id",(req,res)=>{
    let product = req.body;
    productModel.updateOne({_id : req.params.id},product)
    .then((record)=>{
        res.send({data :record ,message:"Product Updated"});
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error!!"})
    })
})






// //  /user/id -> path
// app.get("/products/id",(req,res)=>{
//     console.log("Get request incoming")
//     res.send({message:"Get Product response"})
// })

// //  /user/:id -> url/users?id=fjd    
// app.get("/products/:id",(req,res)=>{
//     console.log(req.params.id);
//     res.send({message:"Single product"})
// })

// app.get("/testing/:id",middleman,(req,res)=>{
//     res.send({message:"testing request"});
// })


app.listen(8000,()=>{
    console.log("Server up and running")
});