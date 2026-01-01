const {Project}= require('../model/index.js');
const multer= require('multer');
const path= require('path');
const fs= require('fs')
const uploadDir= require('../config/uploads.js')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const projectFolder = path.join(uploadDir, 'projects'); 
        if (!fs.existsSync(projectFolder)) {
            fs.mkdirSync(projectFolder, { recursive: true });
        }
        cb(null, projectFolder);
    }, 
    filename: (req, file, cb) => cb(null, `${Date.now()}+${file.originalname}`)
});
const upload = multer({ storage });

const createProject= async(req,res)=>{
    try{
        const {name, id}= req.body;
        if(!name|| !id|| !req.file){
            return res.status(401).json({error:"Please provide all the details"});     
        }
        const imageUrl = `/uploads/projects/${req.file.filename}`;
        const result= await Project.find({id});
        if(result.length){
            return res.status(401).json({error:"Project id already exists"})
        }
        const project= new Project({id,name,projectImage:imageUrl});
        await project.save();
        return res.status(201).json(project);
    }
    catch(error){
        console.error("Error while creating project:", error);
        return res.status(500).json({error:"Internal server error" });
    }
    
}

const getAllProjects= async(req,res)=>{
    try{
        const results= await Project.find();
        return res.status(201).json(results);
    }catch(error){
        console.error("Error while fetching projects:", error);
        return res.status(500).json({error:"Internal server error" });
    }
}

const deleteProject= async(req,res)=>{
    try{
        const {id}= req.params;
        if(!id){
            res.status(400).json({error:"Please provide id"});
        }
        const deletedProject= await Project.deleteOne({id});
        if(deletedProject){
            return res.status(200).json({message:"Project deleted successfully"});
        }
        return res.status(400).json({error:"Project not found"});
    }
    catch(error){
        console.error("Error while deleting project:", error);
        return res.status(500).json({error:"Internal server error" });
    }
}

const updateProject= async(req,res)=>{
    try{
        const {id, name }= req.body;
    let imageUrl;
    if(!id || !name){
        return res.status(400).json({error:"Please provide all details"});
    }
    if(req.file){
        imageUrl = `/uploads/projects/${req.file.filename}`;
    }
    const project= await Project.findOne({id});
    if(!project){
        return res.status(400).json({error:"No such project found"});
    }
    project.name=name;
    if(imageUrl!=undefined){
        project.projectImage=imageUrl;
    }
    await project.save();
    return res.status(200).json({message:"Project Updated Successfully"});
    }

    catch(error){
        console.error("Error while updating project:", error);
        return res.status(500).json({error:"Internal server error" });
    }
    
}

module.exports={createProject, getAllProjects, deleteProject, updateProject, upload};