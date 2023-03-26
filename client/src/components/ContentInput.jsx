// ReactQuill Config
import ReactQuill from "react-quill"
import "../lib/ReactQuill.css"
import { modules, formats } from "../lib/ReactQuill"

const ContentInput = ({ onChange, value }) => {
	return (
		<ReactQuill
			theme='snow'
			modules={modules}
			formats={formats}
			className='text-[#ecf2f8] pb-3 border-0 w-full'
			value={value}
			onChange={onChange}
		/>
	)
}

export default ContentInput
