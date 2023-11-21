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
					usernameElem.focus();
					return;
				}
				localStorage.setItem("token", data.token);

				document.cookie = "loggedIn=true;path=/;expires=" + new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toUTCString();
				window.location.href = "/";
			});
		})
		.catch((err) => {
			alert(err);
			usernameElem.focus();
		});
}
