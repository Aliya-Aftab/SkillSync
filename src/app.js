const express=require('express');
const connectDB=require('./config/database')
const app=express();

const cookieParser=require('cookie-parser')
const jwt=require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser())
// No authentication needed for signup and login api calls

const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request")
const userRouter=require("./routes/user")
// app.post("/signup",async (req, res)=>{
// console.log(req.body)
// const user=new User(
// req.body
// // firstName:"Rose",
// // lastName:"Martin",
// // emailId:"rossyy65@gmail.com",
// // password:"0990@mori"
// ); 
// await user.save();
// res.send("User added successfully")
// })

// // get email by user
// app.get("/user", async (req, res)=>{
// const userEmail=req.body.emailId;
// try{
// const user=await User.findOne({emailId: userEmail});
// if(user.length===0){
// res.status(404).send("User not found")
// }
// else{
// res.send(user)
// }
// }
// catch(err){
// res.status(400).send("Something went wrong")
// }
// })

// // Feed api 
// app.get("/user", async (req, res)=>{
// try{
// const user=await User.find({});
// res.send(user)
// }
// catch(err){
// res.status(400).send("Something went wrong")
// }
// })

// //  Delete api
// app.delete("/user",async (req,res)=>{
// const userId=req.body.userId;
// try{
// const user=await User.findByIdAndDelete(userId);
// res.send("User deleted successfully")
// }
// catch(err){
// res.status(400).send("Something went wrong");
// }
// })

// // update data of the user
// app.patch("/user/:userId", async(req,res)=>{
// const userId=req.params?.userId;
// const data=req.body;
// try{
// const ALLOWED_UPDATES=["photoUrl", "skill", "about"];
// const isUpdateAllowed=Object.keys(data).every((k)=>
// ALLOWED_UPDATES.includes(k)
// );
// if(!isUpdateAllowed){
// throw new Error("Update not allowed");
// }
// if(data?.skills.length>10){
// throw new Error("Skills cannot be more than 10")
// }
// const user=await User.findByIdAndUpdate({_id:userId},data,{
// runValidators: true
// });
// console.log(user);
// res.send("User updated successfully");
// }
// catch(err){
// res.status(400).send("Something went wrong")
// }
// })
app.use("/", userRouter)
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDB()
.then(()=>{
console.log("Database connection established");
app.listen(3000, () => {
console.log("Server is successfully listening on port 3000...");
});
}
)
.catch((err)=>{
console.log("Database cannot be connected");
}
);

