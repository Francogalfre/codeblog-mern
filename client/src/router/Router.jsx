import { createBrowserRouter } from "react-router-dom"

// Layout
import Layout from "../pages/Layout"

// Pages
import HomePage from "../pages/Home"
import LoginPage from "../pages/Login"
import RegisterPage from "../pages/Register"
import CreatePostPage from "../pages/CreatePost"
import PostPage from "../pages/Post"
import EditPostPage from "../pages/EditPost"
import ProfilePage from "../pages/Profile"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "create",
				element: <CreatePostPage />,
			},
			{
				path: "post/:id",
				element: <PostPage />,
			},
			{
				path: "post/edit/:id",
				element: <EditPostPage />,
			},
			{
				path: "profile/:username",
				element: <ProfilePage />,
			},
		],
	},
])
