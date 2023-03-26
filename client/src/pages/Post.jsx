import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Navigate } from "react-router-dom"

import { format } from "date-fns"
import { Link } from "react-router-dom"

// Notification
import { succesfullyToast, errorToast } from "../utils/ToastNotification"

// Icons
import Edit from "../assets/icons/Edit"
import Delete from "../assets/icons/Delete"

// Context
import { useContext } from "react"
import UserContext from "../context/UserContext"

const PostPage = () => {
	const [postInfo, setPostInfo] = useState(null)
	const [redirect, setRedirect] = useState(false)
	const { userInfo } = useContext(UserContext)

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
				setRedirect(true)
			})
		} else if (response.status === 400) {
			errorToast("Failed Post Delete")
		} else {
			console.log({ error: "Fetch Error" })
		}
	}

	if (redirect) {
		return <Navigate to={"/"} />
	}

	if (!postInfo) return ""

	return (
		<div className='h-full flex flex-col gap-4'>
			<img
				className='max-h-[300px] object-cover object-center	relative w-full rounded-lg pb-3'
				src={`http://localhost:4000${postInfo.cover.replace("src", "")}`}
				alt={postInfo.title + "Image"}
			/>

			{userInfo.id === postInfo.author._id && (
				<div className='flex items-center content-center gap-4'>
					<Link
						to={`/post/edit/${postInfo._id}`}
						className='text-[#ecf2f8] gap-2 flex w-[155px] h-[40px] bg-blue-700 hover:bg-blue-800 focus:ring-4 text-center content-center items-center focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-200'
					>
						Edit this Post
						<Edit />
					</Link>
					<button
						onClick={handleDelete}
						className='text-[#ecf2f8] gap-2 flex w-[180px] h-[40px] focus:ring-4 text-center content-center items-center font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:ring-gray-300 transition-all duration-200'
					>
						Delete this Post
						<Delete />
					</button>
				</div>
			)}

			<h1 className='text-2xl text-[#ecf2f8] font-semibold w-full text-start pt-3'>
				{postInfo.title}
			</h1>
			<small className='text-[#89929b] flex gap-3'>
				<time>{format(new Date(postInfo.createdAt), "MMM d, yyyy")}</time>
				<span className='cursor-pointer'>
					by @{postInfo.author && postInfo.author.username}
				</span>
			</small>
			<div
				className='text-[#89929b]'
				dangerouslySetInnerHTML={{ __html: postInfo.content }}
			></div>
		</div>
	)
}

export default PostPage
