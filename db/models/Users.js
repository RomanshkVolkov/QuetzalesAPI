import { Schema, model } from 'mongoose';

const userShema = new Schema({
    username: { type: String, required: true, maxlength: 14 },
    password: { type: String, required: true, maxlength: 10 },
    email: { type: String, required: true, minlength: 5 }
},
{ 
    timestamps: true,
    versionKey: false 
}

);

export default model('User', userShema);