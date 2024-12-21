import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
	plugins: [
		sveltekit(),
		babel({babelConfig: {targets: 'defaults, not ie 11, not ie_mob 11'}})
	]
});
