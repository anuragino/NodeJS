/** 
 
*        API -> Application Programming Interface
it's a collection of lot of functionalitiess and every functionality know
what they wana do when it is called

*   Server -> It is a software which keeps a prog continously running .
So, anyone can access it and can process request and get respond

*           Components of Request
1.Base/IP address     2.route 
3.Methos [GET,POST,PUT,PATCH,DELTE,OPTIONS]
4.Data    5.Headers

*           Components of Respond
1.Data   2.Header   3.Status code


**/

const http = require('http');

// creating a server 
// 127.0.0.1:8000
// localhost:8000


http.createServer((req,res)=>{
    console.log(req.url);
    // console.log(req.method);
    if(req.url=="/products" && req.method=='POST'){
        res.end("created a new product");
    }
    else if(req.url=='/products' && req.method=='GET'){
        res.end('Get product data');
    }
    else if(req.url=='/user' && req.method=='POST'){
        res.end('Added new user ');
    }
    else    res.end("Please check!!");
}).listen(8000)