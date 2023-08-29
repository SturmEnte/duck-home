const usernameElem = document.getElementById("username");
const passwordElem = document.getElementById("password");
const loginBtn = document.getElementById("button");

loginBtn.onclick = login;
usernameElem.onkeydown = (event) => {
	if (event.key == "Enter") passwordElem.focus();
};
passwordElem.onkeydown = (event) => {
	if (event.key == "Enter") login();
};

function login() {
	let username = usernameElem.value;
	let password = passwordElem.value;

	if (!username) {
		alert("No username!");
		return;
	}

	if (!password) {
		alert("No password!");
		return;
	}

	fetch("/api/auth/login", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	})
		.then((res) => {
			res.json().then((data) => {
				if (res.status != 200) {
					alert(data.error);
					return;
				}
				localStorage.setItem("token", data.token);
				document.cookie = "loggedIn=true;path=/";
				window.location.href = "/";
			});
		})
		.catch((err) => {
			alert(err);
		});
}
