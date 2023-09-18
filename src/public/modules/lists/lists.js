const listsElement = document.getElementById("lists");

const ERRORS = {
	updateError: "Error while updating lists",
};

let lists = [];

function updateLists() {
	fetch("/api/lists/lists", {
		method: "get",
		headers: {
			Authorization: localStorage.getItem("token"),
		},
	})
		.then((res) => {
			res.json().then((data) => {
				lists = data;
				displayLists();
			});
		})
		.catch((err) => {
			console.error("Error while fetchting lists:");
			console.error(err);
			alert(ERRORS.updateError);
		});
}

function displayLists() {
	lists.forEach((list) => {
		const listElement = document.createElement("div");
		(listElement.id = list.id), (listElement.innerText = list.name);

		listsElement.appendChild(listElement);
	});
}

updateLists();
