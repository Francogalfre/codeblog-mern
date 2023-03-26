import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

// Notification
import { errorToast, succesfullyToast } from "../utils/ToastNotification"

const useEditPost = () => {
	const { id } = useParams()

	const [title, setTitle] = useState("")
	const [summary, setSummary] = useState("")
	const [content, setContent] = useState("")
	const [files, setFiles] = useState("")

	const navigate = useNavigate()

	const data = new FormData()
	data.set("title", title)
	data.set("summary", summary)
	data.set("content", content)
	data.set("id", id)
	{
		files?.[0] && data.set("file", files?.[0])
	}

	useEffect(() => {
		fetch(`http://localhost:4000/post/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setTitle(data.PostData.title)
				setSummary(data.PostData.summary)
				setContent(data.PostData.content)
			})
	}, [])

	const handleEditPost = async (evt) => {
		evt.preventDefault()

		const response = await fetch(`http://localhost:4000/post/edit/${id}`, {
			method: "PUT",
			body: data,
			credentials: "include",
		})

		if (response.status === 200) {
			response.json().then(() => {
				succesfullyToast("Succesfully Post edited")
				navigate(`/post/${id}`)
			})
		} else if (response.status === 400) {
			errorToast("Failed Post Edit")
		} else {
			console.log({ error: "Fetch Error" })
		}
	}

	return {
		id,
		title,
		summary,
		content,
		setTitle,
		setSummary,
		setContent,
		setFiles,
		handleEditPost,
	}
}

export default useEditPost
