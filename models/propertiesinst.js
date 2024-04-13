import mongoose from "mongoose";

let propertiesinstSchema = new mongoose.Schema(
    {
        institutionId:{
            type:String
        },
        property1:{
            type:String
        },
        income1:{
            type:String
        },
        property2:{
            type:String
        },
        income2:{
            type:String
        },
        property3:{
            type:String
        },
        income3:{
            type:String
        },
        property4:{
            type:String
        },
        income4:{
            type:String
        }
    }
)

let Propertiesinst=mongoose.model('propertiesinst', propertiesinstSchema)
export default Propertiesinst