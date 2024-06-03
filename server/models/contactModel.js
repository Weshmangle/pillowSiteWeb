import mongoose from 'mongoose';


const contactSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 25,
        trim : true
    },
    
    email : {
        type : String,
        minLength : 6,
        maxLength : 30,
        required : true,
        trim : true
    },
    
    subject : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 30,
        trim : true
    },
    
    message : {
        type : String,
        required : true,
        minLength : 10,
        maxLength : 3000,
        trim : true
    },
    
    status : {
        type : String,
        required : true,
        trim : true,
        enum : ["Non traité", "Traité"],
        default : "Non traité"
    }
    
    
}, {
    timestamps : true
})


const Contact = mongoose.model("Contact", contactSchema)

export default Contact