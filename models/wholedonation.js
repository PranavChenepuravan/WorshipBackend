import mongoose from "mongoose";
import User from "./user.js";

let wholedonationSchema=mongoose.Schema(
    {
        instittutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        totalSum:{
            type:Number
        },
        date:{
            type:Date
        },
        tax:{
            type:Number
        },
        balance:{
            type:Number
        },
        currentPercentage:{
            type:Number
        },
        payeddate:{
            type:String
        },
        status:{
            type:String
        }
    }
)

let Wholedonation=mongoose.mongoose.model('wholedonation', wholedonationSchema)

export default Wholedonation