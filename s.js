const http=require("http")
const fs=require("fs")
const server=http.createServer((req,res)=>{
    if(req.url==="/"){
        return homePage(req,res)

    }
    if(req.url==="/username" && req.method==="POST"){
        return returnMainPage(req,res)
    }
function homePage(req,res){
    return res.end(`
    <html>
    <body>
    <form action="/username" method="POST">
    <div>
    <label> Enter the Details
    <input type="text" name="username">
    <div>
    <div>
    <button type="submit">SEND</button>
    </div>
    </form>
    </body>
    </html> 

    `)
}
function returnMainPage(req,res){
    res.setHeader('Content-Type','text/html')
    const body=[]
    req.on("data",function(data){
        body.push(data)

    })
    req.on("end",function(){
        const result=Buffer.concat(body).toString()
        const final=result.split("=")[1]
        fs.writeFileSync("mesage.txt",final)
    })
    res.statusCode=302
    res.setHeader('Location','/')
    res.end()
}
})
server.listen(3000)
