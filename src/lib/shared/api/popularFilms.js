import options from './_options';

let apiURI = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections';

export default async function searchFilm(page = 1) {
	let response = await fetch(`${apiURI}?page=${page}`, options);
	return await response.json();
}
