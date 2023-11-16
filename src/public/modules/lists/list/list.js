const LIST_ID = window.location.hash.slice(1);

const entriesElement = document.getElementById("entries");
const entryTitleElement = document.getElementById("entry-title");

let entries = [];

function updateEntries() {
	fetch("/api/lists/entries/entries?list_id=" + encodeURIComponent(LIST_ID), {
		method: "get",
		headers: {
			Authorization: localStorage.getItem("token"),
		},
	})
		.then((res) => {
			res.json().then((data) => {
				entries = data;
				displayEntries();
			});
		})
		.catch((err) => {
			console.error("Error while fetchting list entries:");
			console.error(err);
		});
}

function displayEntries() {
	entriesElement.innerHTML = "";

	entries.forEach((entry) => {
		const entryElement = document.createElement("div");
		entryElement.classList.add("entry");
		entryElement.id = entry.id;
		entryElement.innerText = entry.title;

		entriesElement.append(entryElement);
	});
}

entryTitleElement.addEventListener("keydown", (event) => {
	if (event.key == "Enter") createList();
});

document.getElementById("create-btn").onclick = createEntry;

function createEntry() {
	const title = entryTitleElement.value;
	fetch("/api/lists/entries/create", {
		method: "post",
		headers: {
			Authorization: localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: title, list_id: LIST_ID }),
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

updateEntries();
