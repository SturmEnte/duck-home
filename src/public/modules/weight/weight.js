const nameElem = document.getElementById("name");
const unitElem = document.getElementById("unit");

function createEntity() {
	console.log("Create Entity");
}

function setPopupState(state) {
	const popup = document.getElementById("curtain");

	if (state) {
		popup.style.display = "flex";
	} else {
		popup.style.display = "none";
	}
}
