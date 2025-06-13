import http from 'http'

const server=http.createServer((req,res)=>{
    res.end("Got your Request!!!!")
});
const port=8000;
server.listen(port,()=>{console.log("Server has started on port no",port)})
