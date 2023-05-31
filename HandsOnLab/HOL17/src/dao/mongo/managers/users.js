import usersModel from "../models/User.js";

export default class UsersManager {
    getUsers = async (params)=>{
      return usersModel.find(params).lean(); 
    }

    addUser = async (user) =>{
        return usersModel.create(user)
    }

    addManyUsers = async (users) =>{
        return usersModel.insertMany(users)
    }
}
