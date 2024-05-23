import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    
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
    
    role : {
        type : String,
        required : true,
        enum : ["admin", "super-admin"],
        default : "admin"
    },
    
    loginTime : {
        type : Date
    }
    
    
}, {
    timestamps : true
})


const User = mongoose.model("User", userSchema)

export default User