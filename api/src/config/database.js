import * as dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const connectionString = process.env.MONGOSTRING

// Connect to MongoDB
mongoose
	.connect(connectionString)
	.then(() => {
		console.log("Database Connected ✔")
	})
	.catch((err) => {
		console.log(err)
	})
