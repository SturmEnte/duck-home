fetch("/api/user", {
	method: "get",
	headers: {
		Authorization: localStorage.getItem("token"),
	},
}).then((res) => {
	res.json().then((data) => {
		document.getElementById("welcome-message").innerHTML = `Welcome back ${data.username}!`;
	});
});
