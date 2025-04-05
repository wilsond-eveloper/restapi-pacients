import mongoose from 'mongoose'

const URI = 'mongodb://localhost/restapi'

mongoose.connect(URI)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('DB is connected')
})

export default connection