const express= require('express');
const router=express.Router()
const {createTask, getAllTasks, updateTask, deleteTask, changeStatus, upload}= require('../controller/tasks.js')

router.get('/:id',getAllTasks);
router.post('/create',upload.single('file'),createTask);
router.put('/update',upload.single('file'),updateTask);
router.put('/update/status/:id',changeStatus)
router.delete('/delete',deleteTask);

module.exports=router;
