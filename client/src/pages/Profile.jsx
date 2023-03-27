import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// Components
import Post from "../components/Post"

const ProfilePage = () => {
	const { username } = useParams()
	const [posts, setPosts] = useState([])

	useEffect(() => {
		fetch(`http://localhost:4000/profile/${username}`, {
			method: "GET",
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => setPosts(data.posts))
	}, [])

	return (
		<div className='h-full'>
			<div className='pb-5 flex flex-col gap-3'>
				<h1 className='text-[#ecf2f8]  text-3xl font-semibold'>{username} Profile</h1>
				<span className='text-[#89929b]'>This user uploaded {posts.length} posts</span>
			</div>
			{posts !== [] ? (
				<div className='grid grid-cols-2 gap-6'>
					{posts.map((post) => (
						<Post key={post._id} {...post} />
					))}
				</div>
			) : (
				<span>This user has no Posts</span>
			)}
		</div>
	)
}

export default ProfilePage
