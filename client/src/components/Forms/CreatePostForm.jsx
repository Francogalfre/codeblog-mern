// Icon
import Plus from "../../assets/icons/Plus"

// Components
import ContentInput from "../ContentInput"

// Hooks
import useCreatePost from "../../hooks/useCreatePost"

const CreatePostForm = () => {
	const {
		title,
		summary,
		content,
		setTitle,
		setSummary,
		setContent,
		setFiles,
		handleNewPost,
	} = useCreatePost()

	return (
		<form
			className='flex flex-col bg-second-background-color rounded-lg content-center text-start items-start px-12 py-10 gap-6'
			onSubmit={handleNewPost}
		>
			<h1 className='text-main-text text-2xl pb-4'>Create your Post</h1>

			<div className='flex flex-col gap-2 w-full'>
				<label htmlFor='postTitle' className='text-second-text text-md font-medium'>
					Title:
				</label>
				<input
					type='text'
					name='postTitle'
					className='flex items-center h-12 px-4 w-full bg-input-background-color text-main-text  rounded focus:outline-none focus:ring-2'
					placeholder='"My First post Title..."'
					value={title}
					onChange={(evt) => setTitle(evt.target.value)}
					required
				/>
			</div>

			<div className='flex flex-col gap-2 w-full'>
				<label htmlFor='postSummary' className='text-second-text text-md font-medium'>
					Post Summary:
				</label>
				<input
					type='text'
					name='postSummary'
					className='flex items-center h-12 px-4 w-full bg-input-background-color text-main-text  rounded focus:outline-none focus:ring-2'
					placeholder='This post is about...'
					value={summary}
					onChange={(evt) => setSummary(evt.target.value)}
					required
				/>
			</div>

			<div className='flex flex-col gap-2 w-full'>
				<label htmlFor='postImage' className='text-second-text text-md font-medium'>
					Upload File:
				</label>
				<input
					type='file'
					name='postImage'
					onChange={(evt) => setFiles(evt.target.files)}
					required
					className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-700 file:text-main-text file:cursor-pointer file:pr-3 file:hover:bg-blue-800 file:transition-colors file:duration-200 block w-full text-sm text-[#89929b] px-4 py-3 rounded-lg cursor-pointer bg-input-background-color focus:outline-none '
				/>
			</div>

			<div className='flex flex-col gap-2 w-full'>
				<label htmlFor='postImage' className='text-second-text text-md font-medium'>
					Post Content:
				</label>
				<ContentInput onChange={(newValue) => setContent(newValue)} value={content} />
			</div>

			<button className='text-main-text bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-200 flex items-center gap-2'>
				Create Post
				<Plus />
			</button>
		</form>
	)
}

export default CreatePostForm
