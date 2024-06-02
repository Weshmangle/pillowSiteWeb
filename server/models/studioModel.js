import mongoose from 'mongoose';


const studioSchema = new mongoose.Schema({
    
    title : {
        type : String,
        required : true,
        trim : true
    },
    
    paragTitle : {
        type : [String],
        required : true,
    },
    
    paragText : {
        type : [String],
        required : true,
    },
    
    teamMember : {
        type : [Object],
        required : true,
    }
    
    
}, {
    timestamps : true
})


// const teamMemberSchema = new mongoose.Schema({
    
//     name : {
//         type: String,
//         required: true,
//         trim: true
//     },
    
//     role : {
//         type: String,
//         required: true,
//         trim: true
//     },
    
//     memberImg : {
//         type: String,
//         required: true,
//         trim: true
//     },
    
// }, {
//     _id: false

// })


const Studio = mongoose.model("Studio", studioSchema)

export default Studio