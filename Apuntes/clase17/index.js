import mongoose from "mongoose";
import orderModel from "./models/order.js";

const context = async()=>{
    const connection = await mongoose.connect('mongodb+srv://ledesma_manu_:QsZvAD66IkiMkiHA@clusteronlytolearn.q6a1iy7.mongodb.net/EcommercePizzas?retryWrites=true&w=majority');
    // const pizzas =[

    //         { name: "Pepperoni", size: "small", price: 19,

    //           quantity: 10, date:"2021-03-13T08:14:30Z" },

    //         { name: "Pepperoni", size: "medium", price: 20,

    //           quantity: 20, date :"2021-03-13T09:13:24Z"},

    //         { name: "Pepperoni", size: "large", price: 21,

    //           quantity: 30, date :"2021-03-17T09:22:12Z"},

    //         { name: "Cheese", size: "small", price: 12,

    //           quantity: 15, date :"2021-03-13T11:21:39.736Z" },

    //         { name: "Cheese", size: "medium", price: 13,

    //           quantity:50, date : "2022-01-12T21:23:13.331Z"},

    //         { name: "Cheese", size: "large", price: 14,

    //           quantity: 10, date : "2022-01-12T05:08:13Z"},

    //         { name: "Vegan", size: "small", price: 17,

    //           quantity: 10, date : "2021-01-13T05:08:13Z"},

    //         { name: "Vegan", size: "medium", price: 18,

    //           quantity: 10, date : "2021-01-13T05:10:13Z"}
    //         ]
    //         const insertResult = await orderModel.insertMany(pizzas);
    //         console.log(insertResult)


    //Aggregation :D
    let requestOrders = await orderModel.aggregate(
        [
            {$match: { size: 'medium' } },//Cada {} corresponde a un stage

            //el _id es el criterio en que se basa para agrupar
            {$group: { _id: '$name', totalQuantity: {$sum: '$quantity'} } }, //Conforme vaya encontrando ordenes que coincidan en un sabor (_id), le voy a sumar la cantidad que se compro (quantity)
            {$sort: { totalQuantity: -1} }, //Lo ordenamos de mayor a menor (-1)
            {$group: {_id: 1, orders: { $push: '$$ROOT'} }}, //el _id: 1 significa que toma todos los documentos, y el push los pushea a todos en un array
            //Con $project proyectamos el doc en uno nuevo
            {$project: {_id: 0, orders: '$orders'} }, // el _id: 0 significa que lo insertamos sin el _id para que mongo lo genere, y las ordenes quedan iguales
            {$merge: {into: 'reports' }} //Lo mergeamos y subimos todo el documento a una collection 'reports'
        ]
        )
        console.log(requestOrders)
        //requestOrders = [
        //     { _id: 'Vegan', totalQuantity: 10 },
        //     { _id: 'Cheese', totalQuantity: 50 },
        //     { _id: 'Pepperoni', totalQuantity: 20 }
        //    ]

        // requestOrders = [ con Sort
        //     { _id: 'Vegan', totalQuantity: 10 },
        //     { _id: 'Cheese', totalQuantity: 50 },
        //     { _id: 'Pepperoni', totalQuantity: 20 }
        //   ]

        //requestOrders = [ 
            // { _id: 1, orders: [ [Object], [Object], [Object] ] } 
           // ]

        //requestOrders = [ { orders: [ [Object], [Object], [Object] ] } ]
    connection.disconnect();
}
context();