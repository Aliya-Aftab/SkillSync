const express=require('express');
const connectDB=require("./config/database")
const app=express();
app.use(express.json());
const User=require("./models/user");
app.post("/signup",async (req, res)=>{
const user=new User({
firstName:"Harry",
lastName:"Potter",
emailId:"harry234@gmail.com",
password:"654@harry"
}); 
await user.save();
res.send("User added successfully")
})


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

// get email by user
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

// Feed api 
// app.get("/user", async (req, res)=>{
// try{
// const user=await User.find({});
// res.send(user)
// }
// catch(err){
// res.status(400).send("Something went wrong")
// }
// })

//  Delete api
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

// update data of the user
app.patch("/user", async(req,res)=>{
const userId=req.body.userId;
const data=req.body;
try{
await User.findByIdAndUpdate({_id:userId},data,{
runValidators: true
});
res.send("User updated successfully");
}
catch(err){
res.status(400).send("Something went wrong")
}
})

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

