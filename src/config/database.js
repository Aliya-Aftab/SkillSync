const mongoose=require("mongoose");
const connectDB = async ()=>{
await mongoose.connect("mongodb+srv://User_db_new:OXtSU0x21PTZD1C3@cluster0.tbqu5rj.mongodb.net/SkillSync");
}
module.exports=connectDB;

