import { Navigate } from "react-router-dom"

// Hooks
import useCreatePost from "../hooks/useCreatePost"

import CreatePostForm from "../components/CreatePostForm"

const CreatePostPage = () => {
	const { redirect } = useCreatePost()

	console.log(redirect)

	return <div className='h-full'>{redirect ? <Navigate to={"/"} /> : <CreatePostForm />}</div>
}

export default CreatePostPage
