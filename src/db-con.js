import mongoose from 'mongoose'
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const URI = process.env.MONGODB_URI 
? process.env.MONGODB_URI
: 'mongodb://localhost/myapp'

mongoose.connect(URI)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('DB is connected')
})

export default connection