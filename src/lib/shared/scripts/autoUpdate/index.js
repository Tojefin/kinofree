const LATEST_RELEASE_URL = 'https://api.github.com/repos/Tojefin/kinofree/releases/latest';

function isTauri() {
	return '__TAURI_INTERNALS__' in window;
}

function isAndroid() {
	return /android/i.test(navigator.userAgent);
}

function isNewer(latest, current) {
	const a = String(latest).split('.').map(Number);
	const b = String(current).split('.').map(Number);
	for (let i = 0; i < Math.max(a.length, b.length); i++) {
		const x = a[i] || 0;
		const y = b[i] || 0;
		if (x !== y) return x > y;
	}
	return false;
}

async function updateDesktop() {
	const { check } = await import('@tauri-apps/plugin-updater');
	const { relaunch } = await import('@tauri-apps/plugin-process');

	const update = await check();
	if (!update) return;

	const ok = window.confirm(`Доступна версия ${update.version}. Обновить сейчас?`);
	if (!ok) {
		await update.close();
		return;
	}

	await update.downloadAndInstall();
	await relaunch();
}

async function updateAndroid() {
	const { getVersion } = await import('@tauri-apps/api/app');
	const { openUrl } = await import('@tauri-apps/plugin-opener');

	const current = await getVersion();
	const response = await fetch(LATEST_RELEASE_URL, {
		headers: { Accept: 'application/vnd.github+json' }
	});
	if (!response.ok) return;

	const release = await response.json();
	const latest = String(release.tag_name || '').replace(/^v/, '');
	if (!latest || !isNewer(latest, current)) return;

	const apk = (release.assets || []).find((asset) => asset.name.endsWith('.apk'));
	const url = apk ? apk.browser_download_url : release.html_url;

	const ok = window.confirm(`Доступна версия ${latest}. Скачать обновление?`);
	if (!ok) return;

	await openUrl(url);
}

export default async function autoUpdate() {
	try {
		if (!isTauri()) return;
		if (isAndroid()) {
			await updateAndroid();
		} else {
			await updateDesktop();
		}
	} catch (error) {
		console.error(error);
	}
}
