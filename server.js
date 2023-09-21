const express = require ("express");
const app = express()
app.use(express.json())


const {connection} = require("./db")

require('dotenv').config()
const userRouter = require("./routes/userRouter")
const flightRouter = require("./routes/flightRouter")
const {auth} = require("./middelwear/auth.middlewear")
const bookingRouter = require("./routes/bookingRouter")

const port = process.env.port;

app.use("/users",userRouter)

app.get("/",(req,res)=>{
    res.send("This is a Home page")
})

app.use(auth)
app.use("/flight",flightRouter)
app.use("/booking", bookingRouter)

app.get("/movie",(req,res)=>{
    res.status(200).json({"msg":"movie data"})
})

app.listen(port,async()=>{

    try {
        await connection
        console.log("connected to atlas data base!!!!!!!!")
    } catch (error) {
        console.log(error)
    }
      console.log(`server runs on port ${port}`)
})



// app.listen(port,async()=>{
//     try {
//         await connection
//         console.log("Connected to Database !!")
//         console.log(`Server is live on ${port}`)
//     } catch (error) {
//         console.log(error)
//     } 
// })











// const token = req.headers.authorization

// jwt.verify(token, 'masai', (err, decoded)=> {
   
//     if(decoded){
//         res.status(200).json({"msg":"movie data"})
//     }
//     else{
//         res.status(400).json({"msg":err.message})
//     }
// })