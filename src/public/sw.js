const STATIC_CACHE = "STATIC-V1";
const MODULES_CACHE = "MODULES";

const ASSETS = ["/", "/index.js", "/index.css", "/global.css", "/main.css", "main.js", "/modules.json", "/sidebar.html", "/404/"];

self.addEventListener("install", async (event) => {
	let cache;

	cache = await caches.open(STATIC_CACHE);
	cache.addAll(ASSETS);

	// Cache all modules
	cache = await caches.open(MODULES_CACHE);
	const modules = await (await fetch("/modules.json")).json();
	modules.forEach((module) => {
		cache.add(`/${module.id}/`);
		cache.add(`/${module.id}/${module.id}.js`);
		cache.add(`/${module.id}/${module.id}.css`);
	});
});

self.addEventListener("fetch", async (event) => {
	console.log(event);

	if (event.request.url.includes("api")) {
		event.respondWith(fetch(event.request));
		return;
	}

	event.respondWith(
		caches.match(event.request).then((res) => {
			console.log("1", res);
			return (
				res ||
				fetch(event.request)
					.then(async (res) => {
						console.log("2", res);
						return res;
					})
					.catch(() => {
						console.log("Catch");
						return caches.match("/404/").then((res) => {
							return res;
						});
					})
			);
		})
	);
});
