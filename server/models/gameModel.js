import mongoose from 'mongoose';


const gameSchema = new mongoose.Schema({
    
    title : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    
    summary : {
        type : String,
        unique : true,
        required : true,
        maxLength : 3000,
        trim : true
    },
    
    visibility : {
        type : String,
        enum : ["public", "private"],
        default : "private"
    },
    
    mainImg : {
        type : String,
        required : true,
        trim : true
    },
    
    otherImg : {
        type : [String],
        required : true,
    },
    
    paragTitle : {
        type : [String],
        required : true,
    },
    
    paragText : {
        type : [String],
        required : true,
    }
    
    
}, {
    timestamps : true
})


const Game = mongoose.model("Game", gameSchema)

export default Game