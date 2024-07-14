const express = require('express');
const server = express();
server.use(express.json());
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('products.json','utf-8'));   //Product.json is my own JSON file having data
const products = data.products;

//API -C-R-U-D
//To read whole file:
server.get('/products',(req,res)=>{
    res.json(products);
})

//To Create POST product
server.post('/products', (req,res)=>{
    console.log(req.body);
    products.push(req.body);
    res.json(products);
})

//To Read specific id
server.get('/products/:id',(req,res)=>{
    const id = +req.params.id;
    const product = products.find(p=>p.id == id);
    res.json(product);
});

//To Update
server.put('/products/:id',(req,res)=>{
    const id = req.params.id;
    const productindex = products.findIndex(p=>p.id==id);
    products.splice(productindex,1,{...req.body, id:id})
    res.status(201).json();
    
});

//To PATCH
server.patch('/products/:id',(req,res)=>{
    const id = req.params.id;
    const productIndex = products.findIndex(p=>p.id==id);
    const product = products[productIndex];
    products.splice(productIndex,1,{...product,...req.body});
    res.status(201).json();
});

//To Delete
server.delete('/products/:id',(req,res)=>{
    const id = req.params.id;
    const productIndex = products.findIndex(p=>p.id==id);
    
    products.splice(productIndex,1);
    res.status(201).json
})

server.post('/')
server.listen(8080,()=>{
    console.log("Server Started");
})
