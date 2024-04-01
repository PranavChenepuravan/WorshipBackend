import mongoose from "mongoose";

let userSchema=mongoose.Schema(
    {
        name:{
            type:String
        },
        username:{
            type:String
        },
        password:{
            type:String
        },
        email:{
            type:String,
            unique:true
        },
        // Institution
        // Income Tax
        // Archaeology
        // Pilgrim
        insttype:{
            type:String
        },
        location:{
            type:String
        },
        community:{
            type:String
        },
        institutionName:{
            type:String
        },
        phone:{
            type:String
        },
        other:{
            type:String
        },
        departmentName:{
            type:String
        },
        userType:{
            type:String
        },
        photo:{
            type:String
        },
        userid:{
            type:String
        },
        status:{
            type:String,
            default:'pending'
        }

    }
    
)
let User=mongoose.model('user',userSchema)

export default User