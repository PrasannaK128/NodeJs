import{readFile,writeFile,appendFile,mkdir}from 'fs/promises'

console.log("File Handling")
// Read file data
const read_file=async (filename)=>{
    const data=await readFile(filename,"utf-8")
    console.log(data)
}

read_file("sample.txt")
  //Write file

   const create_file=async (filename,content)=>{
    await writeFile(filename,content)
    console.log("File created successfully")
   } 

create_file("new.txt","This is new file")
 

// Append File
const append_data=async (filename,content)=>{
    await appendFile(filename,content)
    console.log("Data appented successfully")

}

append_data("new.txt","This is new text")

//Create Folder

const makeFolder=async(folder)=>{
    await mkdir(folder,{recursive:true})
    console.log("Folder has created successfully")

}

makeFolder("src/java/python")