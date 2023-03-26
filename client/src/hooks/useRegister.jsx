import { useState } from "react"

import { errorToast, succesfullyToast } from "../utils/ToastNotification"

const useRegister = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	// Function
	const handleRegister = async (e) => {
		e.preventDefault()

		const response = await fetch("http://localhost:4000/register", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		})

		if (response.status === 200) {
			succesfullyToast("Succesfully Registered")
		} else if (response.status === 400) {
			errorToast("Failed Register")
		} else {
			console.log({ error: "Fetch Error" })
		}
	}

	return { handleRegister, setUsername, setPassword, username, password }
}

export default useRegister
