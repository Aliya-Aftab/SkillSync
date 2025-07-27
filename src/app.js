const express=require('express');
const connectDB=require("./config/database")
const app=express();
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

