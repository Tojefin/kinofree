import { publish } from 'gh-pages';

publish(
	'build',
	{
		branch: 'gh-pages',
		repo: `https://github.com/Tojefin/kinofree.git`
	},
	() => {
		console.log('Deploy Complete!');
	}
);
