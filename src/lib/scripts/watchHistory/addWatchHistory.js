export default function addWatchHistory(film) {
	let data = JSON.parse(localStorage.getItem('watch_history'));
	if (!data) {
		data = [];
	}
	let target = data.filter((obj) => obj.kinopoiskId == film.kinopoiskId)[0];
	if (target) {
		let index = data.indexOf(target);
		data.splice(index, 1);
	}

	let now = Date.now();
	film = {...film, _kinofree: {lastviewed: now} }
	data.unshift(film);
	if (data.length > 24) {
		data.pop();
	}
	localStorage.setItem('watch_history', JSON.stringify(data));
}
