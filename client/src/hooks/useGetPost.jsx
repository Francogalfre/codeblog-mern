import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

// Context
import UserContext from "../context/UserContext"

// Notification
import { succesfullyToast, errorToast } from "../utils/ToastNotification"

const useGetPost = () => {
	const [postInfo, setPostInfo] = useState(null)
	const { userInfo } = useContext(UserContext)

	const navigate = useNavigate()
	const { id } = useParams()

	useEffect(() => {
		fetch(`http://localhost:4000/post/${id}`)
			.then((res) => res.json())
			.then((data) => setPostInfo(data.PostData))
	}, [])

	const handleDelete = async () => {
		const response = await fetch(`http://localhost:4000/post/${id}`, { method: "DELETE" })

		if (response.status === 200) {
			response.json().then(() => {
				succesfullyToast("Succesfully Post Deleted")
				navigate("/")
			})
		} else if (response.status === 400) {
			errorToast("Failed Post Delete")
		} else {
			console.log({ error: "Fetch Error" })
		}
	}

	return { postInfo, userInfo, handleDelete }
}

export default useGetPost
