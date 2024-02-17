export default function setLastFilm(film) {
	let now = Date.now();
	let data = {
		film,
		time: now
	};
	localStorage.setItem('last_film', JSON.stringify(data));
}
