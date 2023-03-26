import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Notification
import { errorToast, succesfullyToast } from "../utils/ToastNotification"

const useCreatePost = () => {
	const [title, setTitle] = useState("")
	const [summary, setSummary] = useState("")
	const [content, setContent] = useState("")
	const [files, setFiles] = useState("")

	const navigate = useNavigate()

	const handleNewPost = async (evt) => {
		evt.preventDefault()

		const data = new FormData()
		data.set("title", title)
		data.set("summary", summary)
		data.set("content", content)
		data.set("file", files[0])

		const response = await fetch("http://localhost:4000/post", {
			method: "POST",
			body: data,
			credentials: "include",
		})

		if (response.status === 200) {
			response.json().then(() => {
				succesfullyToast("Succesfully Created Post")
			})

			navigate("/")
		} else if (response.status === 400) {
			errorToast("Failed to create the the Post")
		} else {
			console.log({ error: "Fetch Error" })
		}
	}

	return {
		title,
		summary,
		content,
		setTitle,
		setSummary,
		setContent,
		setFiles,
		handleNewPost,
	}
}

export default useCreatePost
