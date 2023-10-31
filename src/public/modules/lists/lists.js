const listsElement = document.getElementById("lists");
const listNameElement = document.getElementById("list-name");

const ERRORS = {
	updateError: "Error while updating lists",
	creationError: "Error while creating list",
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
				sortLists();
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
		listElement.id = list.id;
		listElement.classList.add("list");
		listElement.innerText = list.name;

		listsElement.appendChild(listElement);
	});
}

function sortLists() {
	console.log(lists);
	lists.sort((a, b) => {
		if (a.name < b.name) return -1;
		else if (a.name > b.name) return 1;
		return 0;
	});
}

document.getElementById("create-btn").onclick = () => {
	const name = listNameElement.value;
	console.log(name);
	fetch("/api/lists/create", {
		method: "post",
		headers: {
			Authorization: localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: name, return: true }),
	})
		.then((res) => {
			if (res.status != 201) {
				try {
					res.json().then((data) => {
						creationError(data.error);
					});
				} catch {
					creationError("Unknown error");
				}

				return;
			}

			res.json().then((data) => {
				lists.push(data);
				sortLists();
				displayLists();
			});
		})
		.catch(creationError);
};

function creationError(err) {
	console.error("Error while creating list:\n" + err);
	alert(ERRORS.creationError);
}

updateLists();
displayLists();
