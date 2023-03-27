import express from "express"

const router = express.Router()

// Models
import { UserModel } from "../models/User.js"
import { PostModel } from "../models/Post.js"

router.get("/:username", async (req, res) => {
	const { username } = req.params

	if (username) {
		const stringUsername = username.toString()
		const capitalizedUsername =
			stringUsername.charAt(0).toUpperCase() + stringUsername.slice(1)

		const user = await UserModel.findOne({ username: capitalizedUsername })
		const { _id } = user

		const posts = await PostModel.find({ author: _id })

		res.json({ posts: posts })
	} else {
		res.status(400).json({ error: "Profile Error" })
	}
})

export default router
