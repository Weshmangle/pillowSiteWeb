import mongoose from 'mongoose';


const newsletterSchema = new mongoose.Schema({
    
    
    email : {
        type : String,
        required : true,
        minLength : 6,
        maxLength : 30,
        trim : true
    }
    
    
}, {
    timestamps : true
})


const Newsletter = mongoose.model("Newsletter", newsletterSchema)

export default Newsletter