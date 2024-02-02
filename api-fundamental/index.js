/** 
 
*        API -> Application Programming Interface
it's a collection of lot of functionalitiess and every functionality know
what they wana do when it is called

*   Server -> It is a software which keeps a prog continously running .
So, anyone can access it and can process request and get respond

*           Components of Request
1.Base/IP address               2.route /url parameter
3.Methos [GET,POST,PUT,PATCH,DELTE,OPTIONS]
4.Data through request body     5.Headers

*           Components of Respond
1.Data   2.Header   3.Status code


**/

const http = require('http');
const fs = require('fs');
const url = require('url');

// creating a server 
// 127.0.0.1:8000
// localhost:8000

//reading the file as a string data
let products = fs.readFile('./products.json' ,'utf-8',(err,data)=>{
    if(err==null){
        products = data;
    }else{
        console.log("some error detected");
    }
})

http.createServer((req,res)=>{
    let parseUrl = url.parse(req.url,true);
    console.log(parseUrl);

    //get whole products detail
    if(parseUrl.pathname=='/products' && req.method=='GET' && parseUrl.query.id==undefined){
        res.end(products);
    }

    //fetch single object detail
    else if(parseUrl.pathname=='/products' && req.method=='GET' && parseUrl.query.id!=undefined){
        let arrProduct = JSON.parse(products);
        
        let singleProduct = arrProduct.find((product)=>{
            return product.id == parseUrl.query.id ;
        })

        if(singleProduct!=undefined){
            res.end(JSON.stringify(singleProduct));
        }
        else{
            res.end(JSON.stringify({"message":"Product not found"}));
        }

    }

    //create new object and add to the products.json file
    else if(req.method='POST' && parseUrl.pathname=='/products'){
        let product = "";
        //this event is called for every chunk received
        req.on("data",(chunks)=>{
            product+=chunks;
        })

        //this event is called at the end of stream and convert bytes to readable string 
        req.on("end",()=>{
            let newProduct = JSON.parse(product);
            let arrProduct = JSON.parse(products);

            arrProduct.push(newProduct);

            fs.writeFile('./products.json',JSON.stringify(arrProduct),(err)=>{
                if(err==null){
                    res.end(JSON.stringify({"message":'Successfuly added the new data'}))
                }
            })
        })
    }


}).listen(8000)




// http.createServer((req,res)=>{
//     console.log(req.url);
//     console.log(req.method);
//     if(req.url=="/products" && req.method=='POST'){
//         res.end("created a new product");
//     }
//     else if(req.url=='/products' && req.method=='GET'){
//         res.end('Get product data');
//     }
//     else if(req.url=='/user' && req.method=='POST'){
//         res.end('Added new user ');
//     }
//     else    res.end("Please check!!");
// }).listen(8000)