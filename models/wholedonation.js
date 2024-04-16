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
            type:Date,
        },
        totaltax:{
            type:Number
        },
        balance:{
            type:Number
        }   
    }
)

let Wholedonation=mongoose.mongoose.model('wholedonation', wholedonationSchema)

export default Wholedonation