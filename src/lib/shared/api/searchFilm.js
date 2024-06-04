import options from './_options';

let apiURI = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword';

export default async function searchFilm(keyword, page = 1) {
	if (keyword) {
		let response = await fetch(`${apiURI}?keyword=${keyword}&page=${page}`, options);
		return await response.json();
	}
	return [];
}
