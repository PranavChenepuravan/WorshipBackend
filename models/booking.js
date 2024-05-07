import mongoose from "mongoose";
import pilgrim from './user.js'
import User from "./user.js";

let bookingSchema= new mongoose.Schema(
    {
        pilgrimId:{
            type:mongoose.Types.ObjectId,
            ref:pilgrim
        },
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        date:{
            type:Date
        },
        time:{
            type:String
        },
        amount:{
            type:Number
        },
        tax:{
            type:Number
        },
        incomtaxId:{
            type:String
        },
        status:{
            type:String,
            default:'pending'
        },
        currentPercentage:{
            type:Number
        },
        bookeddate:{
            type:Date
        },
        bankName:{
            type:String
        },
        accountNo:{
            type:String
        },
        ifscNo:{
            type:String
        },
        userName:{
            type:String
        }

    }
)

let Booking=mongoose.model('booking', bookingSchema)
export default Booking