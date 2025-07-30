const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
firstName:{
type:String,
required:true
},
lastName:{
type:String
},
emailId:{
type:String,
required: true,
unique:true
},
password:{
type:String,
required:true
},
age:{
type:Number
},
gender:{
type: String,
validate(value){
if(!["male", "female", "others"].includes(value)){
throw new Error("Gender data is not valid");
}
}
},
skill:{
type:[String]
},
about:{
type:String,
default:"This is default about of user"
}
});
const User=mongoose.model("User",userSchema);
module.exports=User;