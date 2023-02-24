const mongoose  = require('mongoose');
import { Schema } from "mongoose";

export const address = {
    name:{
        type:String,
        required: '{PATH} is required!'
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}
