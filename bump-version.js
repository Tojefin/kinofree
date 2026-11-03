// Поднимает версию сразу во всех файлах проекта:
//   package.json, package-lock.json, src-tauri/tauri.conf.json,
//   src-tauri/Cargo.toml, src-tauri/Cargo.lock
//
// Использование:
//   node bump-version.js patch|minor|major|x.y.z [--push] [--dry]
//   npm run release -- patch          # только обновить файлы
//   npm run release -- minor --push   # + коммит, тег vX.Y.Z и пуш (запустит CI-релиз)

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const [arg, ...flags] = process.argv.slice(2);
const push = flags.includes('--push');
const dry = flags.includes('--dry');

if (!arg) {
	console.error('Укажите patch | minor | major | x.y.z');
	process.exit(1);
}

const read = (path) => readFileSync(path, 'utf8');
const write = (path, data) => {
	if (!dry) writeFileSync(path, data);
	console.log(`${dry ? '[dry] ' : ''}обновлён ${path}`);
};

const current = JSON.parse(read('package.json')).version;
const [cMajor, cMinor, cPatch] = current.split('.').map(Number);

let version;
if (/^\d+\.\d+\.\d+$/.test(arg)) {
	version = arg;
} else if (arg === 'major') {
	version = `${cMajor + 1}.0.0`;
} else if (arg === 'minor') {
	version = `${cMajor}.${cMinor + 1}.0`;
} else if (arg === 'patch') {
	version = `${cMajor}.${cMinor}.${cPatch + 1}`;
} else {
	console.error(`Непонятный аргумент: ${arg}`);
	process.exit(1);
}

console.log(`Версия: ${current} -> ${version}${dry ? ' (dry run)' : ''}`);

// package.json (табы)
{
	const pkg = JSON.parse(read('package.json'));
	pkg.version = version;
	write('package.json', JSON.stringify(pkg, null, '\t') + '\n');
}

// package-lock.json (2 пробела)
{
	const lock = JSON.parse(read('package-lock.json'));
	lock.version = version;
	if (lock.packages?.['']) lock.packages[''].version = version;
	write('package-lock.json', JSON.stringify(lock, null, 2) + '\n');
}

// src-tauri/tauri.conf.json (2 пробела)
{
	const conf = JSON.parse(read('src-tauri/tauri.conf.json'));
	conf.version = version;
	write('src-tauri/tauri.conf.json', JSON.stringify(conf, null, 2) + '\n');
}

// src-tauri/Cargo.toml — первое version в секции [package]
{
	const cargo = read('src-tauri/Cargo.toml');
	const next = cargo.replace(/(\[package\][\s\S]*?\nversion = ")[^"]*(")/, `$1${version}$2`);
	if (next === cargo) {
		console.error('Не удалось найти version в [package] (Cargo.toml)');
		process.exit(1);
	}
	write('src-tauri/Cargo.toml', next);
}

// src-tauri/Cargo.lock — запись пакета kinofree
{
	const lock = read('src-tauri/Cargo.lock');
	const next = lock.replace(
		/(\[\[package\]\]\nname = "kinofree"\nversion = ")[^"]*(")/,
		`$1${version}$2`
	);
	if (next === lock) {
		console.error('Не удалось найти пакет kinofree в Cargo.lock');
		process.exit(1);
	}
	write('src-tauri/Cargo.lock', next);
}

if (dry) {
	console.log('Dry run — файлы не изменены.');
	process.exit(0);
}

if (push) {
	const tag = `v${version}`;
	const run = (cmd) => execSync(cmd, { stdio: 'inherit' });
	run('git add -A');
	run(`git commit -m "🚀 release: ${tag}"`);
	run(`git tag ${tag}`);
	run('git push origin main');
	run(`git push origin ${tag}`);
	console.log(`Тег ${tag} запушен — CI собирает релиз.`);
} else {
	console.log('Готово. Для выпуска релиза: node bump-version.js ... --push (или git вручную).');
}
