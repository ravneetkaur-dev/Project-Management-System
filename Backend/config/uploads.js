const path= require('path');
const fs= require('fs');

const uploadDir = path.join('/tmp', 'uploads'); 
console.log(uploadDir);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

module.exports=uploadDir;
