const entitiesElem = document.getElementById("entities");
const nameElem = document.getElementById("name");
const unitElem = document.getElementById("unit");
const dateElem = document.getElementById("date");
const weightElem = document.getElementById("weight");

document.getElementById("create-popup-btn").onclick = createEntity;
document.getElementById("create-btn").onclick = () => setPopupState(true);
document.getElementById("cancel").onclick = () => setPopupState(false);
document.getElementById("set-entry-btn").onclick = () => setEntry;

function setEntry() {
	const date = dateElem.value;
	const weight = weightElem.value;

	console.log("Set entry");
	console.log(date, weight);
}

function createEntity() {
	const name = nameElem.value;
	const unit = unitElem.value;

	if (!name) {
		alert("A name is required");
		return;
	}

	if (!unit) {
		alert("A unit is required");
		return;
	}

	fetch("/api/weight/createEntity", {
		method: "post",
		headers: {
			Authorization: localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
			unit,
		}),
	}).then((res) => {
		if (!res.ok) {
			res.json().then((data) => {
				alert(data.error);
				return;
			});
		}

		nameElem.value = "";
		unitElem.value = "";
		setPopupState(false);

		const option = document.createElement("option");
		option.value = name;
		option.innerText = name;
		entitiesElem.appendChild(option);
	});
}

function setPopupState(state) {
	const popup = document.getElementById("curtain");

	if (state) {
		popup.style.display = "flex";
	} else {
		popup.style.display = "none";
	}
}

fetch("/api/weight/entities", {
	method: "get",
	headers: {
		Authorization: localStorage.getItem("token"),
	},
}).then((res) => {
	res.json().then((data) => {
		data.forEach((entity) => {
			const option = document.createElement("option");
			option.value = entity.name;
			option.innerText = entity.name;
			entitiesElem.appendChild(option);
		});
	});
});
