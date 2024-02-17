export default function vibroTap() {
	if (navigator.vibrate) {
		navigator.vibrate(45);
	}
}
