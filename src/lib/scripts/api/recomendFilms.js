import options from './_options';

let similarsAPI = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';
let sequelsAPI = 'https://kinopoiskapiunofficial.tech//api/v2.1/films';

/**
 * Get linked and similar films by id
 * @param {number} id 
 * @returns {Promise<Array>}
 */
export default async function recomendFilms(id) { 
	if (id) {
		let similars = await fetch(`${similarsAPI}/${id}/similars`, options);
		similars = await similars.json()
		let sequels = await fetch(`${sequelsAPI}/${id}/sequels_and_prequels`, options);
		sequels = await sequels.json()
		return [...sequels, ...similars.items]
	}
	return [];
}
