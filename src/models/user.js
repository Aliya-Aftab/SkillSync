const mongoose=require("mongoose")
const validator=require("validator")
const userSchema=new mongoose.Schema({
firstName:{
type:String,
required:true,
minLength: 4,
maxLength: 50
},
lastName:{
type:String
},
emailId:{
type:String,
required: true,
unique:true,
trim:true,
lowercase:true,
validate(value){
if(!validator.isEmail(value)){
throw new Error("Invalid email address: "+ value)
}
}
},
password:{
type:String,
required:true,
validate(value){
if(!validator.isStrongPassword(value)){
throw new Error("Your password is not strong")
}
}
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
photoUrl:{
type: String,
validate(value){
if(!validator.isURL(value)){
throw new Error("Incoorect URL: "+value)
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
}, {timestamps: true});
const User=mongoose.model("User",userSchema);
module.exports=User;