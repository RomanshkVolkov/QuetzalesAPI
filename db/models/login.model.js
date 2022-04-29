const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginShema = new Schema({
    username: { type: String, required: true, maxlength: 14 },
    password: { type: String, required: true, maxlength: 10 },
    email: { type: String, required: true, minlength: 5 }
}, { versionKey: false });