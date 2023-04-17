const nameElem = document.getElementById("name");
const unitElem = document.getElementById("unit");

document.getElementById("create-popup-btn").onclick = createEntity;
document.getElementById("create-btn").onclick = () => setPopupState(true);
document.getElementById("cancel").onclick = () => setPopupState(false);

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
