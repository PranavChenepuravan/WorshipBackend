import mongoose from "mongoose";
import User from "./user";

let wholedonationSchema=mongoose.Schema(
    {
        instittutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        pilgrimId:{
            type:mongoose.Types.ObjectId,
            ref:pilgrim
        },
        cash:{
            type:Number
        },
        date:{
            type:String
        },
        time:{
            type:String
        }
    }
)