import express from "express"
import jwt from "jsonwebtoken"
import fs from "fs"

// Models
import { PostModel } from "../models/Post.js"

// Multer Config
import multer from "multer"
const uploadMiddleware = multer({ dest: "src/uploads" })

const router = express.Router()

// Secret String
const secret = "jgsajgsajgqmgsakga123sga"

router.post("/", uploadMiddleware.single("file"), async (req, res) => {
	const { originalname, path } = req.file
	const { token } = req.cookies

	const parts = originalname.split(".")
	const extension = parts[parts.length - 1]
	const newPath = path + "." + extension

	fs.renameSync(path, newPath)

	jwt.verify(token, secret, {}, async (err, info) => {
		if (err) throw err

		const { title, summary, content } = req.body

		try {
			await PostModel.create({
				title,
				summary,
				content,
				cover: newPath,
				author: info.id,
			})

			res.status(200).json({ message: "You Create a new Post successfully" })
		} catch (err) {
			res.status(400).json({ error: err })
		}
	})
})

router.get("/", async (_req, res) => {
	const posts = await PostModel.find()
		.populate("author", ["username"])
		.sort({ createdAt: -1 })
		.limit(20)
	res.json({ posts })
})

router.get("/:id", async (req, res) => {
	const { id } = req.params

	try {
		const PostData = await PostModel.findById(id).populate("author", ["username"])
		res.json({ PostData })
	} catch (err) {
		res.status(400).json({ error: err })
	}
})

router.delete("/:id", async (req, res) => {
	const { id } = req.params

	try {
		await PostModel.deleteOne({ _id: id })
		res.json({ message: "You deleted the Post ✔" })
	} catch (err) {
		res.status(400).json({ error: err })
	}
})

router.put("/edit/:id", uploadMiddleware.single("file"), (req, res) => {
	const { token } = req.cookies
	let newPath = null

	if (req.file) {
		const { originalname, path } = req.file

		const parts = originalname.split(".")
		const extension = parts[parts.length - 1]
		newPath = path + "." + extension

		fs.renameSync(path, newPath)
	}

	jwt.verify(token, secret, {}, async (err, info) => {
		if (err) throw err

		const { id, title, summary, content } = req.body

		try {
			const post = await PostModel.findById(id)
			const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id)

			console.log(post.cover.replace("src", ""))

			if (!isAuthor) {
				res.status(400).json({ message: "You are not the author" })
			}

			await post.updateOne({
				title,
				summary,
				content,
				cover: newPath ? newPath : post.cover.replace("src", ""),
			})
		} catch (err) {
			res.status(400).json({ error: err })
		}
	})

	res.json({ message: "Everything Okay", postToEdit: req.params.id })
})

export default router
