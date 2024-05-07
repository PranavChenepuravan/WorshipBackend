import mongoose from 'mongoose'
import User from './user.js'
import Booking from './booking.js'

let instbookingtaxSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        totaltax:{
            type:Number
        },
        payed:{
            type:Number
        },
        balance:{
            type:Number
        },
        status:{
            type:String
        },
        date:{
            type:Date,
            default:Date.now()
        },
        payeddate:{
            type:String
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
let Instbookingtax=mongoose.model('instbookingtax',instbookingtaxSchema)
export default Instbookingtax