const express=require('express');
const connectDB=require('./config/database')
const app=express();
const {validateSignUpData}=require('./utils/validation')
const bcrypt=require('bcrypt');
const User=require("./models/user");
const cookieParser=require('cookie-parser')
const jwt=require("jsonwebtoken");
const {userAuth}=require('./middlewares/auth')
app.use(express.json());
app.use(cookieParser())
// No authentication needed for signup and login api calls
app.post("/signup",async (req, res)=>{
try{
// Validation of data
validateSignUpData(req);
// Encrypt the password
const {firstName, lastName, emailId,password}=req.body;
const passwordHash= await bcrypt.hash(password,10);

// creating a new instance of the user
const user=new User({
firstName,
lastName,
emailId,
password: passwordHash,
});
await user.save();
res.send("User added successfully")
}
catch(err){
res.status(400).send("Error: "+ err.message)
}
});

app.post("/login", async (req,res)=>{
try{
const {emailId, password}=req.body;
const user= await User.findOne({emailId: emailId})
if(!user){
throw new Error("Invalid Credentials")
}
const isPasswordValid= await bcrypt.compare(password, user.password)
if(isPasswordValid){
// create a jwt token

const token=await jwt.sign({_id:user._id},"skillsync@2025",{expiresIn:"7d"});
console.log(token);
// add the token to cookie and send back the response to user
res.cookie("token", token,{httpOnly: true, expires: new Date(Date.now()+ 2*3600000) })


res.send("Login Successful")
}
else{
throw new Error("Invalid Credentials")
}
 
}
catch(err){
 res.status(400).send(err.message || "Something went wrong");
}

})

app.get("/profile", userAuth,async (req,res)=>{
try{
const user=req.user
res.send(user)
}
catch(err){
res.status(400).send(err.message || "Something went wrong")
}
})
app.post("/sendConnectionRequest", userAuth,async(req, res)=>{
const user=req.user;
res.send(user.firstName +"send the Connection Request")
})
app.post("/signup",async (req, res)=>{
console.log(req.body)
const user=new User(
req.body
// firstName:"Rose",
// lastName:"Martin",
// emailId:"rossyy65@gmail.com",
// password:"0990@mori"
); 
await user.save();
res.send("User added successfully")
})

// get email by user
app.get("/user", async (req, res)=>{
const userEmail=req.body.emailId;
try{
const user=await User.findOne({emailId: userEmail});
if(user.length===0){
res.status(404).send("User not found")
}
else{
res.send(user)
}
}
catch(err){
res.status(400).send("Something went wrong")
}
})

// Feed api 
app.get("/user", async (req, res)=>{
try{
const user=await User.find({});
res.send(user)
}
catch(err){
res.status(400).send("Something went wrong")
}
})

//  Delete api
app.delete("/user",async (req,res)=>{
const userId=req.body.userId;
try{
const user=await User.findByIdAndDelete(userId);
res.send("User deleted successfully")
}
catch(err){
res.status(400).send("Something went wrong");
}
})

// update data of the user
app.patch("/user/:userId", async(req,res)=>{
const userId=req.params?.userId;
const data=req.body;
try{
const ALLOWED_UPDATES=["photoUrl", "skill", "about"];
const isUpdateAllowed=Object.keys(data).every((k)=>
ALLOWED_UPDATES.includes(k)
);
if(!isUpdateAllowed){
throw new Error("Update not allowed");
}
if(data?.skills.length>10){
throw new Error("Skills cannot be more than 10")
}
const user=await User.findByIdAndUpdate({_id:userId},data,{
runValidators: true
});
console.log(user);
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

