const express=require("express")
const authRouter=express.Router();
const {validateSignUpData}=require('../utils/validation')
const User=require("../models/user");
const bcrypt=require('bcrypt');

authRouter.post("/signup",async (req, res)=>{
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
photoUrl
});
await user.save();
res.send("User added successfully")
}
catch(err){
res.status(400).send("Error: "+ err.message)
}
});

authRouter.post("/login", async (req,res)=>{
try{
const {emailId, password}=req.body;
const user= await User.findOne({emailId: emailId})
if(!user){
throw new Error("Invalid Credentials")
}
const isPasswordValid= await user.validatePassword(password)
if(isPasswordValid){
// create a jwt token

const token=await user.getJWT();

// add the token to cookie and send back the response to user
res.cookie("token", token,{httpOnly: true, expires: new Date(Date.now()+ 2*3600000) })


res.send(user)
}
else{
throw new Error("Invalid Credentials")
}
 
}
catch(err){
 res.status(400).send(err.message || "Something went wrong");
}

})

authRouter.post("/logout", async(req, res)=>{
res.cookie("token", null, {
expires: new Date(Date.now())
});
res.send("Logout successfully")
})


module.exports=authRouter