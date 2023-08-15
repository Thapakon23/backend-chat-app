const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./config/db')
const router = require('./router/router')
const PORT = process.env.PORT || 5000

db.connect((err) => {
    if (err) {
        console.error(err)
    }
    console.log('The backend is connected to the database')
})

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}/api`)
})

//