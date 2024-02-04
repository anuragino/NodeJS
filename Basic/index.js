// NODE.JS is a runtime env for javaScript
//  Chrome's V8 JavaScript engine,
// DOM can not be done outside .
//  ryan dahl -> 2009

// function -> module -> package/Libarary 

// fs - file system - to read and write files
const fs = require("fs");
const os = require("os");

// sync way of reading / writing
// utf-8 is commonly used to convert binary -> human readable language

// let data = fs.readFileSync("./a.txt","utf-8");

// console.log(data);

// fs.writeFileSync("./pro","Apple");




// asyn way of reading / writing 
// You can handle async via either Promises or Call back
// in asyn first all sync taskk will be done , then async task will be performed.


// let data = fs.readFile("./a.txt","utf-8",(err,data)=>{
//     console.log(err);
//     console.log(data);
// });

// console.log("Anurag")


// writing will always overwrite the file.
// fs.writeFile("./pro.txt","Mango",(err)=>{
//     console.log(err);
// })

// To overcome overwrite we use append func.
// fs.appendFile("./pro.txt","\n life",(err)=>{
//     console.log(err);
// })


// To delete a file
// fs.unlinkSync("./pro.txt") 






// OS -> operating system
console.log(os.platform())
console.log(os.hostname())
console.log(os.freemem())
console.log(os.homedir())
