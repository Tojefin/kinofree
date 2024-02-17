export default function removeWatchHistory(film) {
	let data = JSON.parse(localStorage.getItem('watch_history'));
	if (!data) {
		data = [];
	}
	let filtered = data.filter((obj) => obj.kinopoiskId != film.kinopoiskId);
	localStorage.setItem('watch_history', JSON.stringify(filtered));
}
