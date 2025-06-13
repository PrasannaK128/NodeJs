import path from 'path'


//Joining two or more files
const joined_path=path.join('/path','index.html','python.py')
console.log("Joined path = ",joined_path)

//Get current directory path

const current_path=path.resolve();
console.log("Currently you are working in this directory =",current_path)

//Get file extension

const extension=path.extname("file.pdf")
console.log("Extension of file is ",extension)