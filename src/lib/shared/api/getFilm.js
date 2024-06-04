import options from './_options';

let apiURI = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';

export default async function getFilm(id) {
	if (id) {
		let response = await fetch(`${apiURI}${id}`, options);
		return await response.json();
	}
	return {};
}
