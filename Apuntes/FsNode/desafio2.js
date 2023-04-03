import fs from 'fs';

const context = async ()=>{
    try{
        const content = fs.readFileSync('./package.json', 'utf-8')
        const object = JSON.parse(content);
        console.log(object);


    }catch(error){

    }
}