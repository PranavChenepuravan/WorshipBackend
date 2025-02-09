import mongoose from "mongoose";
import institution from './user.js'
import pilgrim from './user.js'

let donationSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:institution
        },
        name:{
            type:String
        },
        place:{
            type:String
        },
        phone:{
            type:String
        },
        email:{
            type:String
        },
        other:{
            type:String
        },
        amount:{
            type:Number
        },
        tax:{
            type:String
        },
        date:{
            type:String
        },
        time:{
            type:String
        },
        transactiontype:{
            type:String
        },
        category:{
            type:String
        }

    }
)

let Donation=mongoose.model('donation', donationSchema)
export default Donation
