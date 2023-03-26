import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Notification
import { errorToast, succesfullyToast } from "../utils/ToastNotification"

// Context
import { useContext } from "react"
import UserContext from "../context/UserContext"

const useLogin = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const navigate = useNavigate()
	const { setUserInfo } = useContext(UserContext)

	// Function
	const handleLogin = async (evt) => {
		evt.preventDefault()

		const response = await fetch("http://localhost:4000/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		})

		if (response.status === 200) {
			response.json().then((userInfo) => {
				setUserInfo(userInfo)

				succesfullyToast("Succesfully Login")
				navigate("/")
			})
		} else if (response.status === 400) {
			errorToast("Failed Login")
		} else {
			console.log({ error: "Fetch Error" })
		}
	}

	return { handleLogin, setUsername, setPassword, username, password }
}

export default useLogin
