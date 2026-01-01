const {Project, Task}= require('../model/index.js');
const multer= require('multer');
const path= require('path');
const fs= require('fs')
const uploadDir= require('../config/uploads.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const taskFolder = path.join(uploadDir, 'tasks'); 
        if (!fs.existsSync(taskFolder)) {
            fs.mkdirSync(taskFolder, { recursive: true });
        }
        cb(null, taskFolder);
    }, 
    filename: (req, file, cb) => cb(null, `${Date.now()}+${file.originalname}`)
});
const upload = multer({ storage });

const createTask= async(req,res)=>{
    try{
        const {title, id, description, projectId}= req.body;
        if(!title|| !id|| !description|| !projectId){
            return res.status(401).json({error:"Please provide all the details"});     
        }
        let imageUrl;
        if(req.file){
            imageUrl = `/uploads/tasks/${req.file.filename}`;
        }
    
        const project= await Project.findOne({id:projectId});
        if(!project){
            return res.status(401).json({error:"Invalid Project Id"})
        }
          const task = await Task.create({
            title,
            id,
            description,
            ...(imageUrl && { taskImage: imageUrl }),
            });

        project.tasks.push(task._id);
        await project.save();
            return res.status(201).json(task);
    }
    catch(error){
        console.error("Error while creating task:", error);
        return res.status(500).json({error:"Internal server error" });
    }
    
}

const getAllTasks= async(req,res)=>{
    try{
        const projectId= req.params.id;
        const results= await Project.findOne({id:projectId}).populate('tasks');
        if (!results) {
        return res.status(404).json({
        error: "Project not found"
    });
  }
        return res.status(201).json(results.tasks);
    }catch(error){
        console.error("Error while fetching project tasks:", error);
        return res.status(500).json({error:"Internal server error" });
    }
}

const deleteTask= async(req,res)=>{
    try{
        const {taskId, projectId}= req.body;
        if(!taskId|| !projectId){
            res.status(400).json({error:"Please provide id"});
        }
        const project= await Project.findOne({id: projectId})
        const task = await Task.findOne({ id: taskId });
            if (!task) {
            return res.status(404).json({
                error: "Task not found"
            });
            }

    await Task.deleteOne({_id: task._id });

    project.tasks = project.tasks.filter(
      t => t.toString()!== task._id.toString()
    );

    await project.save();

        return res.status(201).json({message:"Task deleted successfully"});
    }
    catch(error){
        console.error("Error while deleting task:", error);
        return res.status(500).json({error:"Internal server error" });
    }
}

const updateTask= async(req,res)=>{
    try{
        const {id, title, description}= req.body;
    let imageUrl;
    if(!id || !title ||!description){
        return res.status(400).json({error:"Please provide all details"});
    }
    if(req.file){
        imageUrl = `/uploads/projects/${req.file.filename}`;
    }
    const task= await Task.findOne({id});
    if(!task){
        return res.status(400).json({error:"No such task found"});
    }
    task.title=title;
    task.description=description;
    if(imageUrl!=undefined){
        task.taskImage=imageUrl;
    }
    await task.save();
    return res.status(200).json({message:"Task Updated Successfully"});
    }

    catch(error){
        console.error("Error while updating task:", error);
        return res.status(500).json({error:"Internal server error" });
    }
    
}

const changeStatus= async(req,res)=>{
    try{
        const id= req.params.id;
    if(!id){
        return res.status(400).json({error:"Please provide task id"});
    }
    const task= await Task.findOne({id});
    if(!task){
        return res.status(400).json({error:"Invalid task id"});
    }
    if(task.status=="Pending"){
        task.status="Completed";
    }
    else{
        task.status="Pending";
    }
    await task.save();
    return res.status(200).json({message:"Status updated successfully"})
    }
    
    catch(error){
        console.error("Error while updating task:", error);
        return res.status(500).json({error:"Internal server error" });
    }
}


module.exports={createTask, getAllTasks, deleteTask, updateTask, changeStatus, upload};