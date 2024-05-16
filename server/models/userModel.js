import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    
    firstName : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 25,
        trim : true
    },
    
    lastName : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 25,
        trim : true
    },
    
    username : {
        type : String,
        unique : true,
        required : true,
        minLength : 4,
        maxLength : 25,
        trim : true
    },
    
    email : {
        type : String,
        unique : true,
        lowercase : true,
        required : true,
        minLength : 4,
        maxLength : 35,
        trim : true
    },
    
    password : {
        type : String,
        required : true,
        minLength : 8,
        maxLength : 300,
        trim : true
    },
    
    profilPicture : {
        type : String,
        required : true,
        default : "user-solid.svg"
    },
    
    role : {
        type : String,
        required : true,
        enum : ["admin", "super-admin"],
        default : "admin"
    }
    
    
}, {
    timestamps : true
})


const User = mongoose.model("User", userSchema)

export default User