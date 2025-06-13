import http from 'http'

const server = http.createServer((req, res) => {
    console.log(req)
    if(req.url==='/home')
    {
        res.end("<h1>You are on home page</h1>")
    }
    else if(req.url==='/about')
    {
        res.end("<h1>You are on anbout page</h1>")
    }
    else
    {
        res.end("<h1>Invalid request</h1>")
    }
    res.end(`<h1>Request has been accepted</h1>`)
})
const port = 1000;
server.listen(port, () => {
    console.log(`u are running on port ${port}`)
})
