import React, { useEffect, useState } from "react"

// Components
import Post from "./Post"
import Spinner from "./Spinner"

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

	const isEmpty = () => {
		return Object.keys(posts).length === 0
	}

	return (
		<div
			className={`${
				isEmpty()
					? "flex w-full text-center justify-center content-center"
					: "grid sm:grid-cols-1 md:grid-cols-2 gap-12"
			} `}
		>
			{isEmpty() && <Spinner />}

			{posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}
		</div>
	)
}

export default PostList
