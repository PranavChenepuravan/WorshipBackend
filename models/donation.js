import mongoose from "mongoose";
import institution from './user.js'
import pilgrim from './user.js'

let donationSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:institution
        },
        pilgrimid:{
            type:mongoose.Types.ObjectId,  
            ref:pilgrim
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
            type:String
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
        }

    }
)

let Donation=mongoose.model('donation', donationSchema)
export default Donation
