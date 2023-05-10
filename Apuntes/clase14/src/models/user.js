import mongoose from "mongoose";

//Dos constantes importantes
const collection = "users"; //A quien apunto a la base

//Acá vamos a delimitar las cosas que vayamos a crear
const schema = new mongoose.Schema({ //Que requisitos tengo que cumplir para mandar la data
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
},{timestamps:{createdAt:"created_at", updatedAt:"updated_at"}})


const userModel = mongoose.model(collection, schema);
export default userModel;