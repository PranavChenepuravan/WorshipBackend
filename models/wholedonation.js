import mongoose from "mongoose";
import User from "./user";

let wholedonationSchema=mongoose.Schema(
    {
        instittutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
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

let Wholedonation=mongoose.mongoose.model('instruction', wholedonationSchema)

export default Wholedonation