fetch("/sidebar.html").then((res) => {
	res.text().then((data) => {
		let oldBody = document.body.innerHTML;
		document.body.innerHTML = data + oldBody;
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
