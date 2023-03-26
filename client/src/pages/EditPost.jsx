import React, { useState, useEffect } from "react"

import { Navigate, useParams } from "react-router-dom"

// Toast
import { succesfullyToast, errorToast } from "../utils/ToastNotification"

// Icons
import Edit from "../assets/icons/Edit"

// ReactQuill Config
import ReactQuill from "react-quill"
import "../utils/ReactQuill.css"
import { modules, formats } from "../utils/ReactQuill"

const EditPostPage = () => {
	const { id } = useParams()

	const [title, setTitle] = useState("")
	const [summary, setSummary] = useState("")
	const [content, setContent] = useState("")
	const [files, setFiles] = useState("")
	const [redirect, setRedirect] = useState(false)

	const data = new FormData()
	data.set("title", title)
	data.set("summary", summary)
	data.set("content", content)
	data.set("id", id)
	{
		files?.[0] && data.set("file", files?.[0])
	}

	useEffect(() => {
		fetch(`http://localhost:4000/post/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setTitle(data.PostData.title)
				setSummary(data.PostData.summary)
				setContent(data.PostData.content)
			})
	}, [])

	const handleEditPost = async (evt) => {
		evt.preventDefault()

		const response = await fetch(`http://localhost:4000/post/edit/${id}`, {
			method: "PUT",
			body: data,
			credentials: "include",
		})

		if (response.status === 200) {
			response.json().then(() => {
				succesfullyToast("Succesfully Post edited")
				setRedirect(true)
			})
		} else if (response.status === 400) {
			errorToast("Failed Post Edit")
		} else {
			console.log({ error: "Fetch Error" })
		}
	}

	if (redirect) {
		return <Navigate to={`/post/${id}`} />
	}

	return (
		<div className='h-full'>
			<form
				className='flex flex-col bg-[#161b22] rounded-lg content-center text-start items-start px-12 py-10 gap-6'
				onSubmit={handleEditPost}
			>
				<h1 className='text-[#ecf2f8] text-2xl pb-4'>Edit your Post</h1>

				<div className='flex flex-col gap-2 w-full'>
					<label htmlFor='postTitle' className='text-[#89929b] text-md font-medium'>
						Title:
					</label>
					<input
						type='text'
						name='postTitle'
						className='flex items-center h-12 px-4 w-full bg-[#21262d] text-[#ecf2f8]  rounded focus:outline-none focus:ring-2'
						value={title}
						onChange={(evt) => setTitle(evt.target.value)}
					/>
				</div>

				<div className='flex flex-col gap-2 w-full'>
					<label htmlFor='postSummary' className='text-[#89929b] text-md font-medium'>
						Post Summary:
					</label>
					<input
						type='text'
						name='postSummary'
						className='flex items-center h-12 px-4 w-full bg-[#21262d] text-[#ecf2f8]  rounded focus:outline-none focus:ring-2'
						value={summary}
						onChange={(evt) => setSummary(evt.target.value)}
					/>
				</div>

				<div className='flex flex-col gap-2 w-full'>
					<label htmlFor='postImage' className='text-[#89929b] text-md font-medium'>
						Upload File:
					</label>
					<input
						type='file'
						name='postImage'
						onChange={(evt) => setFiles(evt.target.files)}
						className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-700 file:text-[#ecf2f8] file:cursor-pointer file:pr-3 file:hover:bg-blue-800 file:transition-colors file:duration-200 block w-full text-sm text-[#89929b] px-4 py-3 rounded-lg cursor-pointer bg-[#21262d] focus:outline-none '
					/>
				</div>

				<div className='flex flex-col gap-2 w-full'>
					<label htmlFor='postImage' className='text-[#89929b] text-md font-medium'>
						Post Content:
					</label>
					<ReactQuill
						theme='snow'
						modules={modules}
						formats={formats}
						className='text-[#ecf2f8] pb-3 border-0 w-full'
						value={content}
						onChange={(newValue) => setContent(newValue)}
					/>
				</div>

				<button className='text-[#ecf2f8] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-200 flex items-center gap-2'>
					Edit Post
					<Edit />
				</button>
			</form>
		</div>
	)
}

export default EditPostPage
