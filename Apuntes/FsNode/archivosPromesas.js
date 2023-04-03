import fs from 'fs';
const context = async () =>{
    try{
        //Escribir un nuevo archivo
        await fs.promises.writeFile('./archivoPromesa.txt', 'Hola promesas');
        //Concatenar algo al archivo
        await fs.promises.appendFile('./archivoPromesa.txt', "Nuevo text");
        //Leer el archivo
        const content = await fs.promises.readFile('./archivoPromesa.txt', 'utf-8')
        console.log(content)
    } catch(error){ 
        console.log(error)
    }
}

context();