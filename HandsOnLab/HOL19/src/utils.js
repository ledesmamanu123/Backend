import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

export const createHash = async (password) =>{
    //Generar los Salts
    const salts = await bcrypt.genSalt(10); //Cantidad de veces q las salts se van a mezclar con la pass
    return bcrypt.hash(password,salts);
}

export const validatePassword = async (password, hashedPass) =>{
    return bcrypt.compare(password, hashedPass) //Comparamos y verificamos q la contraseña sea correcta.
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;