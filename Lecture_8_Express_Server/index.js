import express from 'express'
const app=express()
const port=1000;
app.listen(port,()=>{console.log(`you are runnin gon port ${port}`)  })
app.get('/',(req,res)=>res.send(`<h1>Hello this is Express JS!!!</h1>`))
app.get('/home',(req,res)=>res.send(`<h1>Hello this is Express JS HOME!!!</h1>`))
app.get('/about',(req,res)=>res.send(`<h1>Hello this is Express JS ABOUT!!!</h1>`))