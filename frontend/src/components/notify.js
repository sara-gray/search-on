import { toast } from 'react-toastify'

export const notify = (message, status, styling) => {
	let toastStyle = {
		position: toast.POSITION.TOP_RIGHT,
		autoClose: 5000,
		hideProgressBar: true,
	}
	if (styling) toastStyle = { ...toastStyle, ...styling }

	switch (status) {
		case 'SUCCESS':
			toast.success(message, toastStyle)
			break
		case 'WARN':
			toast.warn(message, toastStyle)
			break
		case 'INFO':
			toast.info(message, toastStyle)
			break
		default:
			toast(message, toastStyle)
	}
}
