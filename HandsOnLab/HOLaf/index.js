import mongoose from "mongoose";
import usersModel from "./models/user.js";

const context = async()=>{
    const connection = mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/Clase17?retryWrites=true&w=majority')

    //Aggregation :D
    let requestUsers = await usersModel.aggregate(
        // [
        //     {$sort: {grade: -1}},
        // ]
        // [
        //     {$group: {_id: '$group', totalStudents: {$sum:1}}}
        // ]
        // [
        //     {$match: {group:'1B'}},
        //     {$group: {_id:'$group', avg: {$avg:'$grade'}}}
        // ]
        // [
        //     {$match: {group: '1A'} },
        //     {$group: {_id: '$group', avg: {$avg:'$grade'}}}
        // ]
        // [
        //     {$group: {_id:'Students', avg: {$avg:'$grade'}}}
        // ]
        // [
        //     {$match: {gender:'Male'}},
        //     {$group: {_id:'$gender', avgGrade: {$avg:'$grade'}}}
        // ]
        [
            {$match: {gender:'Female'}},
            {$group: {_id:'$gender', avgGrade: {$avg:'$grade'}}}
        ]
    )
console.log(requestUsers)
}

context();