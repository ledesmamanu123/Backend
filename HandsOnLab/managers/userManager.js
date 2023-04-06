import fs from 'fs';
import crypto from 'crypto';

export default class UserManager {
    constructor(){
        this.path = './HandsOnLab/files/Users.json';
    }
    getUsers = async () =>{ 
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const users = JSON.parse(data);
            return users;
        }else return [];
    }

    addUser = async (user)=>{
        const users = await this.getUsers(); //Traemos el array de usuarios con nuestro metodo
        const userIndex = users.findIndex(u => u.name === user.name);
        if (userIndex === -1){
            user.salt = crypto.randomBytes(128).toString('base64'); //Código secreto para mezclar con la contraseña
            user.password = crypto.createHmac('sha256',user.salt).update(user.password).digest('hex');
            users.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'));
            console.log(`${user.name} was created successful`)
        }
        else{
            console.log("This user already exists");
        }
    }

    deleteUser = async (user) =>{
        const users = await this.getUsers();
        const userIndex = users.findIndex(u=>u.name === user.name)
        if (userIndex === -1){
            console.log('User not found');
        }else{
            const newUsers = users.filter(u => u.name != user.name);
            await fs.promises.writeFile(this.path, JSON.stringify(newUsers, null, '\t'));
            console.log('User deleted');
        }
    }

    validateUser = async (user) =>{
        const users = await this.getUsers();
        const userIndex = users.findIndex(u => u.name === user.name);
        if(userIndex === -1){
            console.log('User not found');
        }else{
            const fileUser = users[userIndex];
            const newCompareHash = crypto.createHmac('sha256',fileUser.salt).update(user.password).digest('hex');
            if(newCompareHash=== fileUser.password){
                console.log("Logueado");
            }else console.log("Contraseña incorrecta");
        }
    }
}