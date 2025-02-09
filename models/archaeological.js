import mongoose from "mongoose";
import institution from './user.js'

let archSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:institution
        },
        location:{
            type:String
        },
        community:{
            type:String
        },
        name:{
            type:String
        },
        phone:{
            type:String
        },
        email:{
            type:String
        },
        date:{
            type:String
        },
        wealthid:{
            type:String
        },
        wealthname:{
            type:String
        },
        type:{
            type:String
        },
        size:{
            type:String
        },
        weight:{
            type:String
        },
        eraofmanufacture:{
            type:String
        },
        madein:{
            type:String
        },
        material:{
            type:String
        },
        antiquevalue:{
            type:String
        },
        heritage:{
            type:String
        },
        photo:{
            type:String
        },
        institutionname:{
            type:String
        },
        institutiontype:{
            type:String
        },
        antiquevalue:{
            type:String
        },
        status:{
            type:String,
            default:'pending'
        },
        rating:{
            type:Number
        }



    }
)

let Archaeological=mongoose.model('archaeological',archSchema)

export default Archaeological