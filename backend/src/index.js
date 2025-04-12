import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import {io, app, server} from "./lib/socket.js"

dotenv.config()

const port = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser({ limit: '10mb', extended: true }))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(port, ()=>{
    console.log("Sever is running on "+ port)
    connectDB()
})