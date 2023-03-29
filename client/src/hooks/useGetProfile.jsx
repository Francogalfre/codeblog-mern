import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const useGetProfile = () => {
	const { username } = useParams()
	const [posts, setPosts] = useState([])

	if (username !== undefined) {
		useEffect(() => {
			fetch(`http://localhost:4000/profile/${username}`, {
				method: "GET",
				credentials: "include",
			})
				.then((res) => res.json())
				.then((data) => setPosts(data.posts))
		}, [username])
	} else console.log("Fetch Error")

	return { posts, username }
}

export default useGetProfile
