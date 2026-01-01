const mongoose= require('mongoose');

const ProjectSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true
    },
    
    createdAt:{
       type:Date,
       default:Date.now
    },

    projectImage: {
        type: String,
    },

    tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    }
  ]
})
const project=mongoose.model("Project",ProjectSchema);
module.exports=project;