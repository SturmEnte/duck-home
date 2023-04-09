fetch("/sidebar.html").then((res) => {
	res.text().then((data) => {
		let oldBody = document.body.innerHTML;
		document.body.innerHTML = data + oldBody;
		sidebarLoaded();
	});
});

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
	document.getElementById("logout").onclick = () => {
		fetch("/api/logout", {
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
}
