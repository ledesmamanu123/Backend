import {fileURLToPath} from 'url';
import { dirname } from 'path';

export const cookieExtractor = (req) =>{
    let token = null; //Supongamos q no tengo ningun token
    if(req&&req.cookies){ //Verificamos si existe una cookie
        token = req.cookies['authToken'] //De las 30 posibles cookies q tenenemos, traeme la que tiene de nombre authToken
    }
    return token;
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;