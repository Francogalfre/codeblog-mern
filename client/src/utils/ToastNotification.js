import toast from "react-hot-toast"

export const errorToast = (text) =>
	toast.error(`${text}`, {
		duration: 4000,
		position: "top-center",
		style: {
			backgroundColor: "#1f2937",
			color: "#ecf2f8",
		},
	})

export const succesfullyToast = (text) =>
	toast.success(`${text}`, {
		duration: 4000,
		position: "top-center",
		style: {
			backgroundColor: "#1f2937",
			color: "#ecf2f8",
		},
	})
