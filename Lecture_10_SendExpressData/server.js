import express from 'express'
import path from 'path'
const app=express();
const port=1000;
app.listen(port,()=>console.log(`Listening on port ${port}`))

const product=[

     {title:'iphone',price:'99999'},
     {title:'oneplus',price:'43434'},
     {title:'samsung',price:'342329'},

]

const basePath=path.resolve()
console.log(basePath)
const filePath=path.join(basePath,'/index.html')
console.log(filePath)



app.get('/html',(req,res)=>res.send(`<h3>this is HTML response</h3>`))

app.get('/json',(req,res)=>res.json({message:'this is json response',products:product}))

app.get('/htmlfile',(req,res)=>res.sendFile(filePath))
