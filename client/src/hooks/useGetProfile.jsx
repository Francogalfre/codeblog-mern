import { useState, useEffect } from "react"

const useGetProfile = () => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		fetch(`http://localhost:4000/profile/${username}`, {
			method: "GET",
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => setPosts(data.posts))
	}, [])

	return { posts }
}

export default useGetProfile
