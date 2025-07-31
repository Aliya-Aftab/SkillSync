const jwt=require('jsonwebtoken');
const User=require('../models/user')
const userAuth=async (req, res, next)=>{
try{
// read token from req cookies
const {token}=req.cookies;
if(!token){
throw new Error("Invalid Token")
}
// validate the token
const decodedObj=await jwt.verify(token,"skillsync@2025")
// find the username
const {_id}=decodedObj
const user=await User.findById(_id);
if(!user){
throw new Error("User not found");
}
req.user=user;
next();
}
catch(err){
res.status(400).send("Error: "+ err.message)
}
}
module.exports={
userAuth
};