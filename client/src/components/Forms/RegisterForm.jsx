import React from "react"

// Hooks
import useRegister from "../../hooks/useRegister"

const RegisterForm = () => {
	const { handleRegister, setPassword, setUsername, username, password } = useRegister()

	return (
		<form
			className='flex flex-col bg-second-background-color rounded-lg content-start text-start items-start p-12 mt-12 gap-5'
			onSubmit={handleRegister}
			action='#'
		>
			<label
				className='font-normal text-lg w-full text-main-text text-start'
				htmlFor='username'
			>
				Username
			</label>
			<input
				className='flex items-center h-12 px-4 w-full bg-input-background-color text-main-text rounded focus:outline-none focus:ring-2'
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder='francogalfre...'
				required
			/>
			<label
				className='font-normal text-lg w-full text-main-text text-start'
				htmlFor='username'
			>
				Password
			</label>
			<input
				className='flex items-center h-12 px-4 w-full bg-input-background-color text-main-text rounded focus:outline-none focus:ring-2'
				type='password'
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				placeholder='.....'
				required
			/>
			<button
				to='/register'
				type='submit'
				className='text-[#ecf2f8] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-200'
			>
				Register
			</button>
		</form>
	)
}

export default RegisterForm
