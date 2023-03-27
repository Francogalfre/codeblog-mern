// >------- Imports -------<
// Server Utils
import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser"

import path from "path"
import { fileURLToPath } from "url"

// Connection Mongo
import "./config/database.js"

// Routes
import RegisterRouter from "./routes/Register.route.js"
import LoginRouter from "./routes/Login.route.js"
import ProfileRouter from "./routes/Profile.route.js"
import PostRouter from "./routes/Post.route.js"

// >------- Server Config -------<
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
dotenv.config()

// >------- Routes -------<
// Register
app.use("/register", RegisterRouter)

// Login
app.use("/login", LoginRouter)

// Profile
app.use("/profile", ProfileRouter)

// Create Post
app.use("/post", PostRouter)

// Logout
app.post("/logout", (_req, res) => {
	res.cookie("token", "").json("You logged out Successfully")
})

// Handle error middleware
app.use((err, _req, res, _next) => {
	console.error(err.stack)
	res.status(500).send("Something broke!")
})

// Listen Server
app.listen(process.env.PORT, () => {
	console.log("Server Running ✔")
})
