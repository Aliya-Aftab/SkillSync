const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
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
 enum: ["male", "female", "others"],
// validate(value){
// if(!["male", "female", "others"].includes(value)){
// throw new Error("Gender data is not valid");
// }
// }
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

userSchema.methods.getJWT=async function(){
const user=this;
const token=await jwt.sign({_id: this._id}, "skillsync@2025",{expiresIn:"7d"});
return token;
};


userSchema.methods.validatePassword=async function(passwordInputByUser){
const user=this;
const hashPassword=this.password
const isPasswordValid=await bcrypt.compare(passwordInputByUser, hashPassword);
return isPasswordValid;
}

const User=mongoose.model("User",userSchema);
module.exports=User;