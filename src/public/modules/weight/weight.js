const entitiesElem = document.getElementById("entities");
const nameElem = document.getElementById("name");
const unitElem = document.getElementById("unit");
const unitTextElem = document.getElementById("unit-text");
const dateElem = document.getElementById("date");
const weightElem = document.getElementById("weight");

document.getElementById("create-popup-btn").onclick = createEntity;
document.getElementById("create-btn").onclick = () => setPopupState(true);
document.getElementById("cancel").onclick = () => setPopupState(false);
document.getElementById("set-entry-btn").onclick = setEntry;

let entities = [];
let selectedEntity;

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

		const entity = {
			name,
			unit,
			weight: [],
		};

		entities.push(entity);
		updateEntitiesList();
		selectEntity(name);
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
		entities = data;
		updateEntitiesList();
	});
});

function updateEntitiesList() {
	entitiesElem.innerHTML = "";

	entities.forEach((entity) => {
		const option = document.createElement("option");
		option.value = entity.name;
		option.innerText = entity.name;
		entitiesElem.appendChild(option);
	});

	if (!selectedEntity) {
		selectEntity(entities[0].name);
	}
}

function updateWeightData() {
	data.innerHTML = "";

	selectedEntity.weight.forEach((entry) => {
		data.innerHTML += `${entry.date} ${entry.weight}`;
	});
}

function selectEntity(entityName) {
	let entity;

	entities.forEach((e) => {
		if (e.name == entityName) entity = e;
	});

	selectedEntity = entity;
	entitiesElem.value = selectedEntity.name;
	unitTextElem.innerText = selectedEntity.unit;
}

entitiesElem.oninput = () => {
	selectEntity(entitiesElem.value);
};
