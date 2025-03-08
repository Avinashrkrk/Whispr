import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.listen(port, ()=>{
    console.log("Sever is running on "+ port)
    connectDB()
})