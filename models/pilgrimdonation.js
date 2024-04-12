import mongoose from "mongoose";
import pilgrim from './user.js'
import User from "./user.js";

let pilgrimdonationSchema=mongoose.Schema(
    {
        pilgrimId:{
            type:mongoose.Types.ObjectId,
            ref:pilgrim
        },
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        type:{
            type:String
        },
        date:{
            type:String
        },
        time:{
            type:String
        },
        amount:{
            type:Number
        },
        material:{
            type:String
        },
        size:{
            type:String
        },
        weight:{
            type:String
        },
        tax:{
            type:Number
        },
        status:{
            type:String
        },
        worth:{
            type:Number
        }
    }
)

let Pilgrimdonation=mongoose.model('pilgrimdonation', pilgrimdonationSchema)
export default Pilgrimdonation