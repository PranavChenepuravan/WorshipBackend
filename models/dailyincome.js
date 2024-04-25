import mongoose from "mongoose";
import institution from './user.js'

let dailyincomeSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:institution
        },
        date:{
            type:String
        },
        income:{
            type:Number

        },
        expense:{
            type:Number

        },
        salary:{
            type:Number

        },
        amount:{
            type:Number
        }
    }
)

let Dailyincome=mongoose.model('dailyincome', dailyincomeSchema)
export default Dailyincome