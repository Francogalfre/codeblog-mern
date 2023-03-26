import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

// Secret String
const secret = "jgsajgsajgqmgsakga123sga"

router.get("/", (req, res) => {
	const { token } = req.cookies

	if (token) {
		jwt.verify(token, secret, {}, (err, info) => {
			if (err) throw err
			res.json(info)
		})
	}
})

export default router
