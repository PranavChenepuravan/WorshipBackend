import mongoose from "mongoose";
import institution from './user.js'

let dailyincomeSchema=mongoose.Schema(
    {
        institionId:{
            type:mongoose.Types.ObjectId,
            ref:institution
        },
        date:{
            type:String
        },
        amount:{
            type:Number
        }
    }
)

let Dailyincome=mongoose.model('dailyincome', dailyincomeSchema)
export default Dailyincome