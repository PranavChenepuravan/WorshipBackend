import mongoose from "mongoose";

import Booking from "./booking.js";

let bookingtaxSchema=mongoose.Schema(
    {
        bookingId:{
            type:mongoose.Types.ObjectId,
            ref:Booking
        },
        booingtax:{
            type:Number
        },
    }
)

let Bookingtax=mongoose.model('bookingtax',bookingtaxSchema)

export default Bookingtax