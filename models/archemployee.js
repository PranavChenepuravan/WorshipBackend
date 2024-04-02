import mongoose from "mongoose";

let archemployeeSchema = new mongoose.Schema (
    {
        employeeId:{
            type:String
        },
        photo:{
            type:String
        },
        phone:{
            type:String
        },
        email:{
            type:String
        },
        name:{
            type:String
        },
        other:{
            type:String
        },
        location:{
            type:String
        }

    }
)
let Archemployee=mongoose.model('archemployee', archemployeeSchema)

export default Archemployee