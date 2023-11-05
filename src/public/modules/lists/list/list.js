const LIST_ID = window.location.hash.slice(1);

fetch("/api/lists/entries/entries?list_id=" + encodeURIComponent(LIST_ID), {
	method: "get",
	headers: {
		Authorization: localStorage.getItem("token"),
	},
})
	.then((res) => {
		res.json().then((data) => {
			data.forEach((entry) => {
				document.getElementById("content").innerHTML += `<br/>${entry.title}`;
			});
		});
	})
	.catch((err) => {
		console.error("Error while fetchting list entries:");
		console.error(err);
	});
