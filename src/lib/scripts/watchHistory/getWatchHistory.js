export default function getWatchHistory() {
	let data = JSON.parse(localStorage.getItem('watch_history'));
	if (!data) {
		localStorage.setItem('watch_history', JSON.stringify([]));
		data = [];
	}
	return data;
}
