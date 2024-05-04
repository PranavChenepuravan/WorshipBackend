import mongoose from "mongoose";
import institution from './user.js'

let archheritageSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:institution
        },
        location:{
            type:String,
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
            type:String,
        },
        date:{
            type:String
        },
        area:{
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
        sanction:{
            type:String
        },
        rating:{
            type:Number
        },
        status:{
            type:String,
            default:'pending'
        }



    }
)

let Archheritage=mongoose.model('archheritage',archheritageSchema)

export default Archheritage