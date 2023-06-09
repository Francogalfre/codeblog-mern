// Date Format
import { format } from "date-fns"
import { Link } from "react-router-dom"

// Icons
import Edit from "../assets/icons/Edit"
import Delete from "../assets/icons/Delete"

// Hooks
import useGetPost from "../hooks/useGetPost"

const PostPage = () => {
	const { handleDelete, userInfo, postInfo } = useGetPost()

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
						className='text-main-text gap-2 flex w-[155px] h-[40px] bg-blue-700 hover:bg-blue-800 focus:ring-4 text-center content-center items-center focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-200'
					>
						Edit this Post
						<Edit />
					</Link>
					<button
						onClick={handleDelete}
						className='text-main-text gap-2 flex w-[180px] h-[40px] focus:ring-4 text-center content-center items-center font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-900 focus:outline-none dark:ring-gray-300 transition-all duration-200'
					>
						Delete this Post
						<Delete />
					</button>
				</div>
			)}

			<h1 className='text-2xl text-main-text font-semibold w-full text-start pt-3'>
				{postInfo.title}
			</h1>
			<small className='text-second-text flex gap-3'>
				<time>{format(new Date(postInfo.createdAt), "MMM d, yyyy")}</time>
				<Link to={`/profile/${postInfo.author.username}`} className='cursor-pointer'>
					by @{postInfo.author && postInfo.author.username}
				</Link>
			</small>
			<div
				className='text-second-text'
				dangerouslySetInnerHTML={{ __html: postInfo.content }}
			></div>
		</div>
	)
}

export default PostPage
