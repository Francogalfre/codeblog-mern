import React from "react"

// Hooks
import useLogin from "../../hooks/useLogin"

const LoginForm = () => {
	const { handleLogin, setUsername, setPassword, username, password } = useLogin()

	return (
		<form
			className='flex flex-col bg-[#161b22] rounded-lg content-start text-start items-start p-12 mt-12 gap-5'
			onSubmit={handleLogin}
		>
			<label
				className='font-normal text-lg w-full text-[#ecf2f8] text-start'
				htmlFor='username'
			>
				Username
			</label>
			<input
				className='flex items-center h-12 px-4 bg-[#21262d] text-[#ecf2f8]  rounded focus:outline-none focus:ring-2 w-full'
				type='text'
				placeholder='francogalfre...'
				value={username}
				onChange={(evt) => setUsername(evt.target.value)}
				required
			/>
			<label
				className='font-normal text-lg w-full text-[#ecf2f8] text-start'
				htmlFor='username'
			>
				Password
			</label>
			<input
				className='flex items-center h-12 px-4 bg-[#21262d] text-[#ecf2f8] rounded focus:outline-none focus:ring-2 w-full'
				type='password'
				placeholder='.....'
				value={password}
				onChange={(evt) => setPassword(evt.target.value)}
				required
			/>
			<button
				to='/register'
				className='text-[#ecf2f8] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition-all duration-200'
			>
				Login
			</button>
		</form>
	)
}

export default LoginForm
