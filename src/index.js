import app from './app.js'
import connection from './db-con.js'
const portnum = 4040

app.listen(portnum)
console.log(`Server running on port ${portnum}`)