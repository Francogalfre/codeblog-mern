import React, { useEffect, useState } from "react"

import { errorToast, succesfullyToast } from "../utils/ToastNotification"

import { Link } from "react-router-dom"

// Context
import { useContext } from "react"
import UserContext from "../context/UserContext"

import Logo from "../assets/icons/Logo"

const Header = () => {
	const { userInfo, setUserInfo } = useContext(UserContext)

	useEffect(() => {
		try {
			fetch("http://localhost:4000/profile", {
				method: "GET",
				credentials: "include",
			}).then((response) => {
				response.json().then((userInfo) => setUserInfo(userInfo))
			})
		} catch (e) {
			console.error(e)
		}
	}, [])

	const handleLogout = () => {
		try {
			fetch("http://localhost:4000/logout", {
				method: "POST",
				credentials: "include",
			})
			setUserInfo(null)
			succesfullyToast("Succesfully Logout")
		} catch {
			errorToast("Failed Logout")
		}
	}

	const username = userInfo?.username

	return (
		<header className='md:flex-row md:justify-between mb-10 items-center flex flex-col gap-4 content-center text-center'>
			<div className='flex flex-col md:flex-row gap-4 items-center text-center content-center'>
				<Link to='/' className='text-3xl font-semibold text-[#ecf2f8] flex items-center gap-3'>
					<Logo />
					Codeblog
				</Link>
				{username && <span className='text-[#ecf2f8] mt-2'>{username}</span>}
			</div>

			<nav className='flex gap-4 text-lg'>
				{username ? (
					<>
						<button
							onClick={handleLogout}
							className='text-[#ecf2f8] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 transition-all duration-200'
						>
							Logout
						</button>
						<Link
							to={"/create"}
							className='text-[#ecf2f8] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-200'
						>
							Create new Post
						</Link>
					</>
				) : (
					<>
						<Link
							to='/login'
							className='text-[#ecf2f8] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-200'
						>
							Login
						</Link>
						<Link
							to='/register'
							className='text-[#ecf2f8] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 transition-all duration-200'
						>
							Register
						</Link>
					</>
				)}
			</nav>
		</header>
	)
}

export default Header
