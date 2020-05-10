const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/admin')
const bookRouter = require('./routers/book')

const app = express()
app.use(express.json())

app.use(userRouter)
app.use(bookRouter)

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`)
})