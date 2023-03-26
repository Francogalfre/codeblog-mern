import express from "express"
import bcrypt from "bcryptjs"

const router = express.Router()

// Models
import { UserModel } from "../models/User.js"

// Hash Password
const salt = bcrypt.genSaltSync(10)

router.post("/", async (req, res) => {
	const { username, password } = req.body

	try {
		await UserModel.create({
			username,
			password: bcrypt.hashSync(password, salt),
		})

		res.status(200).json({ message: "You Registered successfully" })
	} catch (err) {
		res.status(400).json({ error: err })
	}
})

export default router
