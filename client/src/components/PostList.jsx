import React, { useEffect, useState } from "react"

// Components
import Post from "./Post"

const PostList = () => {
	const [posts, setPosts] = useState({})

	useEffect(() => {
		fetch("http://localhost:4000/post", {
			method: "GET",
		}).then((response) =>
			response.json().then((posts) => {
				setPosts(posts.posts)
			})
		)
	}, [])

	return (
		<div className='grid sm:grid-cols-1 md:grid-cols-2 gap-12 '>
			{posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}
		</div>
	)
}

export default PostList
