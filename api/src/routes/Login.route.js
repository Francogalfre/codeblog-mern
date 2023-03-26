import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const router = express.Router()

// Models
import { UserModel } from "../models/User.js"

// Secret String
const secret = "jgsajgsajgqmgsakga123sga"

router.post("/", async (req, res) => {
	const { username, password } = req.body
	const user = await UserModel.findOne({ username })

	const decryptedPassword = bcrypt.compareSync(password, user.password)

	if (decryptedPassword) {
		const token = jwt.sign({ username, id: user._id }, secret)
		res.cookie("token", token).json({
			message: "Succesfully Save Token",
			id: user._id,
			username: username,
		})
	} else {
		res.status(400).json({ error: "Wrong credentials" })
	}
})

export default router
