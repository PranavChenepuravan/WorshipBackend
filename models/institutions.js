import mongoose from "mongoose";

let userSchema=mongoose.Schema(
    {
        name:{
            type:String
        },
        userid:{
            type:String
        },
        location:{
            type:String
        }
    }
)