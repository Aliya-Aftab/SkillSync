const express=require("express");
const { userAuth } = require("../middlewares/auth");
const mongoose=require("mongoose")
const userRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest")
const User=require("../models/user")
const USER_SAFE_DATA= ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"];
// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async(req, res)=>{
try{
 const loggedInUser = req.user;
const connectionRequests=await ConnectionRequest.find({
 toUserId:new mongoose.Types.ObjectId(loggedInUser._id),
status: "interested",
}).populate("fromUserId", USER_SAFE_DATA);
res.json({message: "Data fetched successfully", data: connectionRequests})
}
catch(err){
res.status(400).send("Error: "+err.message);
}
})

userRouter.get("/user/connections", userAuth, async (req, res)=>{
try{
const loggedInUser=req.user;
const connectionRequests=await ConnectionRequest.find({
$or:[
{toUserId: loggedInUser._id, status:"accepted"},
{fromUserId: loggedInUser._id, status:"accepted"}
],
}).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);
const data=connectionRequests.map((row)=>{
if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
return row.toUserId
}
return row.fromUserId;
})
res.json({data});
} 
catch(err){
res.status(400).send({message : err.message});
}  
})
// user should see all the user card except:
//his own card, his connections, ignored ones, already he had send the connection request
userRouter.get("/feed", userAuth, async (req, res)=>{
try{
const loggedInUser=req.user;
// find all connection request sent or received
const connectionRequests= await ConnectionRequest.find({
$or:[
{fromUserId: loggedInUser},
{toUserId: loggedInUser}
]
}).select("fromUserId toUserId");

const hideUsersFromFeed=new Set();
connectionRequests.forEach((req)=>{
hideUsersFromFeed.add(req.fromUserId.toString());
hideUsersFromFeed.add(req.toUserId.toString());
});
const users= await User.find({
$and:[
{_id : { $nin: Array.from(hideUsersFromFeed)}},
{_id: {$ne: loggedInUser._id}},
],
}).select(USER_SAFE_DATA);
res.status(200).json({                                   
    message: "Users fetched successfully",
    data: users
  });
}
catch(err){
res.status(400).json({message: err.message});
}
})


module.exports=userRouter;