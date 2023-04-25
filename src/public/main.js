// Load sidebar
fetch("/sidebar.html").then((res) => {
	res.text().then((data) => {
		document.getElementById("sidebar").innerHTML = data;
		sidebarLoaded();
	});
});

// Insert the username into the bottom field inside the sidebar
fetch("/api/user", {
	method: "get",
	headers: {
		Authorization: localStorage.getItem("token"),
	},
}).then((res) => {
	res.json().then((data) => {
		document.getElementById("username").innerHTML = data.username;
	});
});

// Executes when the sidebar is inserted into the body
function sidebarLoaded() {
	// Logout button
	document.getElementById("logout").onclick = () => {
		fetch("/api/auth/logout", {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: localStorage.getItem("token"),
			}),
		}).finally(() => {
			localStorage.removeItem("token");
			// Clear all cookies
			// https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i];
				const eqPos = cookie.indexOf("=");
				const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
			}
			window.location.href = "/login";
		});
	};

	const modulesElem = document.getElementById("modules");
	const moduleTemplate = document.getElementById("module");

	// Load modules
	fetch("/modules.json")
		.then(async (res) => {
			if (res.status != 200) {
				modulesElem.innerHTML = "Failed to load modules";
				return;
			}

			const modules = await res.json();
			modules.forEach((module) => {
				let elem = moduleTemplate.content.cloneNode(true);

				elem.getElementById("link").href = `/${module.id}`;
				elem.getElementById("name").innerHTML = module.name;

				if (window.location.href.includes(module.id)) elem.getElementById("link").setAttribute("active", "");

				modulesElem.appendChild(elem);
			});
		})
		.catch((err) => {
			modulesElem.innerHTML = "Failed to load modules<br/>" + err;
			return;
		});
}

// Service worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/sw.js")
		.then(() => {
			console.log("SW registered");
		})
		.catch((err) => {
			console.log("Error while registering SW:", err);
		});
} else {
	console.log("SW not supported");
}
