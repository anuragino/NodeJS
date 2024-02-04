/**
    Mongoose is a ODM (Object Data Model) tool i.e 
    used to convert bson/json to javaScript object data.

 **/

const mongoose = require('mongoose');

//connection to mongoDB server
mongoose.connect(process.env.URL_LINK)
.then(()=>{
    console.log("Successful Connection");
})
.catch((err)=>{
    console.log(err);
})

//Schema it's a structure i.e. how data/doc/record will look like
let userSchema = mongoose.Schema({
    name :{
        type:String,
        require: [true,'Name is Mandatory']
    },
    age : {
        type : Number,
        min : [16,'Age should be above 15'],
        max : 65
    },
    password :{
        type:String,
        require:true,
        minLen :[8,'Min length should be 8'],
        maxLen :[16,'Max length can be 12']
    },
    role:{
        type:String,
        enum:['admin','student','teacher']
    }
},{timestamps:true})

// Model it keep realtion b/w schema and users
let userModel = mongoose.model("users",userSchema);

let user = {
    name : "Anurag",
    age : 19,
    password:"lksjdfald"
}

// add data
// userModel.create(user)
// .then((data)=>{
//     console.log(data);
//     console.log("Inserted data");
// })
// .catch((err)=>{
//     console.log(err);
// })


//fetch data
// userModel.find()
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })

// userModel.findOne({name:'Riya' , age:{$lte:37}})
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })

// userModel.find().limit(2)
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })

// sort data   1 for asecnding && -1 for decsending
// userModel.find().sort({age:1})  
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })

//update data     updateOne for one updation , updateMany for multiple updation
// userModel.updateOne({name:'hemesh'},{age:25})
// .then((info)=>{
//     console.log(info);
// })
// .catch((err)=>{
//     console.log(err);
// })

//delete data   deleteOne,deleteMany
// userModel.deleteMany({name:'Anurag'})
// .then((info)=>{
//     console.log(info);
// })
// .catch((err)=>{
//     console.log(err);
// })