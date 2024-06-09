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
		let result = [...sequels, ...similars.items]

		result = result.filter((value, index, self) =>
			index === self.findIndex((t) => (
				t.place === value.place && t.filmId === value.filmId
			))
		)

		return result
	}
	return [];
}
