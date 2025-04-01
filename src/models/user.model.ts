import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required:false,
        default:"DEFAULT_USER"
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
        unique :true,
    },
    joinedDate: {
        type: Date,
        required: true,
    },
    stats:{
        type :String,
        enum: ["new", "active", "banned"],
        required: true,
        default:"active"
    },
    accountDeletedOnDate: {
        type: Date,
        required: false,
    },
    refreshToken : {
        type: String,
        required: false,
        unique: true,
    }

}, {timestamps: true});

const User = mongoose.model('User', userSchema); 

export default User;