const listsElement = document.getElementById("lists");
const listNameElement = document.getElementById("list-name");

const ERRORS = {
	updateError: "Error while updating lists",
	creationError: "Error while creating list",
	deletionError: "Error while deleting list",
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
	listsElement.innerHTML = "";

	lists.forEach((list) => {
		const listElement = document.createElement("div");
		const contentElement = document.createElement("div");
		const deleteButtonElement = document.createElement("div");

		contentElement.innerText = list.name;

		deleteButtonElement.innerText = "x";
		deleteButtonElement.classList.add("list-delete-button");
		deleteButtonElement.onclick = (event) => {
			event.stopPropagation();
			deleteList(list.id);
		};

		listElement.id = list.id;
		listElement.classList.add("list");
		listElement.appendChild(contentElement);
		listElement.appendChild(deleteButtonElement);
		listElement.onclick = () => (location.href = `list#${list.id}`);

		listsElement.appendChild(listElement);
	});
}

function deleteList(id) {
	let list = lists.find((list) => list.id == id);

	if (!list) {
		alert("List id was not found");
		return;
	}

	if (prompt(`Are you sure you want to delete ${list.name}? Type "yes" to confirm.`) == "yes") {
		fetch("/api/lists/delete", {
			method: "delete",
			headers: {
				Authorization: localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: list.id }),
		})
			.then((res) => {
				if (res.status != 204) {
					try {
						res.json().then((data) => {
							error(data.error, "delete");
						});
					} catch {
						error("Unknown error", "delete");
					}

					return;
				}

				lists = lists.filter((list) => list.id != id);
				sortLists();
				displayLists();
			})
			.catch((err) => error(err, "delete"));
	}
}

function sortLists() {
	lists.sort((a, b) => {
		if (a.name < b.name) return -1;
		else if (a.name > b.name) return 1;
		return 0;
	});
}

listNameElement.addEventListener("keydown", (event) => {
	if (event.key == "Enter") createList();
});

document.getElementById("create-btn").onclick = createList;

function createList() {
	const name = listNameElement.value;
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
						error(data.error, "create");
					});
				} catch {
					error("Unknown error", "create");
				}

				return;
			}

			res.json().then((data) => {
				lists.push(data);
				sortLists();
				displayLists();
			});
		})
		.catch((err) => error(err, "create"));
}

function error(err, type) {
	if (type == "create") {
		console.error("Error while creating list:\n" + err);
		alert(ERRORS.creationError);
	} else if (type == "delete") {
		console.error("Error while deleting list:\n" + err);
		alert(ERRORS.deletionError);
	}
}

updateLists();
displayLists();
