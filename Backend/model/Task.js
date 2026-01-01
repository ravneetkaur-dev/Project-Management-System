const mongoose= require('mongoose');

const TaskSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },

    title: {
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },
    
    status:{
        type: String,
        enum: ["Pending","Completed"],
        default: "Pending",
    },

    createdAt:{
       type:Date,
       default:Date.now
    },
    
    taskImage: {
        type: String,
    },
})
const task=mongoose.model("Task",TaskSchema);
module.exports=task;