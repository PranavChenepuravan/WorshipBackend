import express from 'express'
import mongoose from 'mongoose'
const app=express()
import cors from 'cors'
mongoose.connect('mongodb://127.0.0.1:27017/WroshipStraightPath')
.then(() => console.log('connected !'));

import pilgrimRouter from './routes/pilgrim.js'
import adminRouter from './routes/admin.js'
import incometaxRouter from './routes/incometax.js'
import archaeologyRouter from './routes/archaeology.js'
import institutionRouter from './routes/institution.js'
import commonRouter from './routes/Common.js'
app.use('/uploads', express.static('uploads'));
app.use(cors())
app.use(express.json())
app.use('/',commonRouter)
app.use('/pilgrim',pilgrimRouter)
app.use('/admin',adminRouter)
app.use('/incometax',incometaxRouter)
app.use('/archaeology',archaeologyRouter)
app.use('/institution',institutionRouter)


app.listen(4000)