import mongoose from "mongoose";

let userSchema=mongoose.Schema(
    {
        institutionId:{
            type:String
        },
        userId:{
            type:String
        },
        photo:{
            type:String
        },
        email:{
            type:String
        },
        phone:{
            type:String
        }

    }
)
let Picture=mongoose.model('user',userSchema)

export default User