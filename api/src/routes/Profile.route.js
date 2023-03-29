import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

// Models
import { UserModel } from "../models/User.js"
import { PostModel } from "../models/Post.js"

router.get("/", (req, res) => {
	const { token } = req.cookies

	if (token) {
		jwt.verify(token, process.env.SECRET, {}, (err, info) => {
			if (err) throw err
			res.json(info)
		})
	}
})

router.get("/:username", async (req, res) => {
	const { username } = req.params

	if (username !== undefined) {
		const stringUsername = username.toString()
		const capitalizedUsername =
			stringUsername.charAt(0).toUpperCase() + stringUsername.slice(1)

		const user = await UserModel.findOne({ username: capitalizedUsername })

		const id = user._id

		const posts = await PostModel.find({ author: id })

		res.json({ posts: posts })
	} else {
		res.status(400).json({ error: "Profile Error" })
	}
})

export default router
