const entitiesElem = document.getElementById("entities");
const nameElem = document.getElementById("name");
const unitElem = document.getElementById("unit");
const unitTextElem = document.getElementById("unit-text");
const dateElem = document.getElementById("date");
const weightElem = document.getElementById("weight");
const dataElem = document.getElementById("data");

document.getElementById("create-popup-btn").onclick = createEntity;
document.getElementById("create-btn").onclick = () => setPopupState(true);
document.getElementById("cancel").onclick = () => setPopupState(false);
document.getElementById("set-entry-btn").onclick = setEntry;

let entities = [];
let selectedEntity;

function setEntry() {
	let date = dateElem.value;
	let weight = weightElem.value;

	console.log(weight);

	if (!date) {
		alert("A date is required");
		return;
	}

	if (!weight) {
		alert("A weight is required");
		return;
	}

	date = Number(date.replace("-", "").replace("-", ""));
	weight = Number(weight);

	console.log("Set entry");
	console.log(date, weight);

	fetch("/api/weight/setEntry", {
		method: "post",
		headers: {
			Authorization: localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: selectedEntity.name,
			date,
			weight,
		}),
	});

	selectedEntity.weight.push({ date, weight });
	updateWeightData();
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

const chart = new Chart(dataElem, {
	type: "line",
	data: {
		labels: [],
		datasets: [
			{
				data: [],
				borderWidth: 1,
				borderColor: "#3ba555",
				pointBackgroundColor: "#3ba555",
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	},
});

function updateWeightData() {
	selectedEntity.weight.sort((a, b) => {
		return a.date - b.date;
	});

	labels = [];
	data = [];

	selectedEntity.weight.forEach((entry) => {
		// Turns the number date (for example 20231122) into a date string with the formatting DD.MM.YYYY (for example 20231122 -> 22.11.2023)
		let dateString = String(entry.date);
		labels.push(`${dateString.slice(6)}.${dateString.slice(4, 6)}.${dateString.slice(0, 4)}`);

		data.push(entry.weight);
	});

	console.table(data);

	chart.data.labels = labels;
	chart.data.datasets[0].data = data;
	chart.update();
}

function selectEntity(entityName) {
	let entity;

	entities.forEach((e) => {
		if (e.name == entityName) entity = e;
	});

	selectedEntity = entity;
	entitiesElem.value = selectedEntity.name;
	unitTextElem.innerText = selectedEntity.unit;
	updateWeightData();
}

entitiesElem.oninput = () => {
	selectEntity(entitiesElem.value);
};
