import React from "react"

import { Link } from "react-router-dom"

import { format } from "date-fns"

const Post = ({ _id, cover, title, summary, createdAt, author }) => {
	return (
		<div className='items-start justify-start text-start w-full h-full flex flex-col gap-4 lg:grid-cols-2'>
			<Link to={`post/${_id}`}>
				<img
					src={`http://localhost:4000` + cover.replace("src", "")}
					alt={title + `Image`}
					className='cursor-pointer w-full lg:w-[400px] rounded-lg'
				/>
			</Link>
			<div className='flex flex-col gap-3 lg:gap-2'>
				<small className='text-blue-300'>Programming</small>
				<div>
					<h3 className='text-2xl font-bold pb-1 lg:text-2xl text-[#ecf2f8]'>{title}</h3>
					<small className='text-[#89929b] flex gap-3'>
						<time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
						{author && author.username}
					</small>
				</div>
				<span className='text-sm font-normal lg:text-md text-[#89929b]'>
					{summary.slice(0, 150) + (summary.length > 40 ? "..." : "")}
				</span>
			</div>
		</div>
	)
}

export default Post
