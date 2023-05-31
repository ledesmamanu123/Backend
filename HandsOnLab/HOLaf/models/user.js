import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'users';

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    grade:Number,
    group:String
})

schema.plugin(mongoosePaginate)

const usersModel = mongoose.model(collection, schema);

export default usersModel;