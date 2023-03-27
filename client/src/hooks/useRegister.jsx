import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Notification
import { errorToast, succesfullyToast } from "../utils/ToastNotification"

const useRegister = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const navigate = useNavigate()

	const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1)

	// Function
	const handleRegister = async (e) => {
		e.preventDefault()

		const response = await fetch("http://localhost:4000/register", {
			method: "POST",
			body: JSON.stringify({ username: capitalizedUsername, password }),
			headers: { "Content-Type": "application/json" },
		})

		if (response.status === 200) {
			succesfullyToast("Succesfully Registered")
			navigate("/login")
		} else {
			errorToast("Fetch error")
			console.log({ error: "Fetch Error" })
		}
	}

	return { handleRegister, setUsername, setPassword, username, password }
}

export default useRegister
