const express= require('express');
const router=express.Router();
const {createProject, getAllProjects, updateProject, deleteProject, upload}= require('../controller/projects.js')

router.get('/',getAllProjects);
router.post('/create',upload.single('file'),createProject);
router.put('/update',upload.single('file'),updateProject);
router.delete('/delete/:id',deleteProject);

module.exports=router;
