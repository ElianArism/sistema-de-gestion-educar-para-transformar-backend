import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./db/connect-db"

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

connectDB()

app.listen(process.env.PORT, () => {
  console.log("Process running on port", process.env.PORT)
})
