import { Schema, model } from "mongoose"

const PostSchema = new Schema(
	{
		title: String,
		summary: String,
		content: String,
		cover: String,
		author: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
)

export const PostModel = model("Post", PostSchema)
