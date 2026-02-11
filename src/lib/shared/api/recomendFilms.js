import options from './_options';

const urlAPI = 'https://kinopoiskapiunofficial.tech/api/v2.2/films';

const allowedRelations = ['SIMILAR', 'SEQUEL', 'PREQUEL', 'VERSION', 'SPIN_OFF'];

/**
 * Get linked and similar films by id
 * @param {number} id
 * @returns {Promise<Array>}
 */
export default async function recomendFilms(id) {
	if (id) {
		let relations = await fetch(`${urlAPI}/${id}/relations`, options);
		relations = await relations.json();
		let result = [...relations.items];

		result = result.filter((movie) => allowedRelations.includes(movie.relationType));

		result = result.reduce(
			(acc, movie) => {
				const id = movie.kinopoiskId;
				if (!acc.seen.has(id)) {
					acc.seen.add(id);
					acc.result.push(movie);
				}
				return acc;
			},
			{ seen: new Set(), result: [] }
		).result;

		return result;
	}
	return [];
}
