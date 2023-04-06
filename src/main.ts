import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
	console.log("Listening to port", process.env.PORT);
});
