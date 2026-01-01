const express=require('express');
const db=require('./config/db.js');
const cors=require('cors');
const dotenv=require('dotenv');
const projectRouter= require('./routes/projectRoutes.js');
const taskRouter= require('./routes/taskRoutes.js');
const uploadDir= require('./config/uploads.js');

dotenv.config();
const PORT=process.env.PORT;
const app=express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use('/uploads', express.static(uploadDir));
app.use(express.json());

app.use('/',projectRouter);
app.use('/tasks',taskRouter);

app.listen(PORT, async()=>{
    try{
        await db();
        console.log(`Server running on port ${PORT}`);
    }catch(error){
        console.error(error);
    }
})