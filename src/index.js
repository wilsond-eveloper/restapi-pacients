import app from './app.js'
import connection from './db-con.js'
import dotenv from 'dotenv';


// Cargar variables de entorno
dotenv.config();

const portnum = process.env.PORT

app.listen(portnum)
console.log(`Server running on port ${portnum}`)