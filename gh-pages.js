import 'dotenv/config'
import { publish } from 'gh-pages';

publish(
 'build',
 {
  branch: 'gh-pages',
  repo: `https://${process.env.GH_TOKEN}@github.com/Tojefin/kinofree.git`,
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);
