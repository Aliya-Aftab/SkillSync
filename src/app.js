const express=require('express');
const app=express();
// app.get("/user",(req,res)=>{
// console.log(req.query);
// res.send(
//     {firstname: "Aliya",
//     lastname: "Aftab"}
// )
// })

app.get("/user/:userId/:userPassword",(req,res)=>{
console.log(req.params);
res.send(
    {firstname: "Aliya",
    lastname: "Aftab"}
)
})

app.use("/hello",(req, res)=>{
res.send("Hello, Hello, Hello!")
})

app.use("/",(req, res)=>{
res.send("Hello from the server!")
})

app.listen(3000, () => {
console.log("Server is successfully listening on port 3000...");
});