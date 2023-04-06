import UserManager from "./managers/userManager.js";

const userManager = new UserManager();


const context = async() =>{
    const newUser = {
        name : "Carlos",
        lastName: "Pelayes",
        password: '123',
    }
    const newUser2 = {
        name: "Manuel",
        lastName: "Ledesma",
        password: 'chicle',
    }
    const newUser3 = {
        name: "Brenda",
        lastName: "Ledesma",
        password: 'tini123',
    }
    const logUser = {
        name:"Tatiana",
        password: 'victoRia56'
    }
    await userManager.deleteUser(newUser);
    await userManager.addUser(newUser2);
    await userManager.addUser(newUser3);
    await userManager.validateUser(logUser);
}
context();