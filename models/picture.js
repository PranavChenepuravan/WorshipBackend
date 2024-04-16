import mongoose from "mongoose";
import User from "./user.js";

let pictureSchema=mongoose.Schema(
    {
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        
        pilgrimId:{
            type:String
        },
      
        photo:{
            type:String
        },
        status:{
            type:String,
            default:'rejected'
        }
        


    }
)
let Picture=mongoose.model('pictre',pictureSchema)

export default Picture