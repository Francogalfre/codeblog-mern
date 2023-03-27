import React from "react"
import { Toaster } from "react-hot-toast"

import { Outlet } from "react-router-dom"

// Components
import Header from "../components/Header"

// Context
import { UserContextProvider } from "../context/UserContext"

const Layout = () => {
	return (
		<UserContextProvider>
			<section className='w-full bg-background-color h-full'>
				<section className='max-w-[900px] mx-auto p-10 font-poppins bg-background-color'>
					<Header />
					<Toaster containerStyle={{ marginTop: 30 }} />

					<Outlet />
				</section>
			</section>
		</UserContextProvider>
	)
}

export default Layout
