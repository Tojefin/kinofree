const watchHistory = {
	get: (id) => {
		try {
			let data = JSON.parse(localStorage.getItem('watch_history'));
			if (!data) {
				localStorage.setItem('watch_history', JSON.stringify([]));
				data = [];
			}
			if (id) {
				return data.filter((obj) => obj.kinopoiskId == id)[0];
			}
			return data;
		} catch (error) {
			console.error(error);
		}
	},

	add: (film) => {
		let data = watchHistory.get();

		let target = data.filter((obj) => obj.kinopoiskId == film.kinopoiskId)[0];
		if (target) {
			let index = data.indexOf(target);
			data.splice(index, 1);
		}

		let now = Date.now();
		film = { ...film, _kinofree: { lastviewed: now, progress: target._kinofree.progress ?? null } };
		data.unshift(film);
		if (data.length > 24) {
			data.pop();
		}
		localStorage.setItem('watch_history', JSON.stringify(data));
	},

	remove: (film) => {
		let data = watchHistory.get();

		let filtered = data.filter((obj) => obj.kinopoiskId != film.kinopoiskId);
		localStorage.setItem('watch_history', JSON.stringify(filtered));
		data = filtered;
	},

	setProgress: (id, progress) => {
		let data = watchHistory.get();

		let target = data.filter((obj) => obj.kinopoiskId == id)[0];
		if (target) {
			let index = data.indexOf(target);
			data.splice(index, 1);
		}

		let now = Date.now();
		let film = { ...target, _kinofree: { lastviewed: now, progress } };
		console.log("update progress", film)
		data.unshift(film);
		if (data.length > 24) {
			data.pop();
		}
		localStorage.setItem('watch_history', JSON.stringify(data));
	}
};

export default watchHistory;
