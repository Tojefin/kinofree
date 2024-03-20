export default function vibroTap() {
	try {
		if (navigator.vibrate) {
			navigator.vibrate(45);
		}
	} catch (error) {
		console.error(error)
	}
}
